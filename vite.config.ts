import {defineConfig, Plugin} from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { Project } from "ts-morph";

const setServerHost: Plugin = {
  name: 'edit capacitor plugin',
  configureServer: (server) => {
    server.httpServer.once('listening', () => {
      const {
        port
      } = server.httpServer.address() as any
      const p = new Project()
      p.addSourceFileAtPath('./capacitor.config.ts')
      const capConfig = p.getSourceFileOrThrow('capacitor.config.ts')

      capConfig.getVariableDeclarations().forEach(v => {
        if(v.getName() === "config") {
          const config = JSON.parse(v.getStructure().initializer as string)

          config.server.url = `http://localhost:${port}`
          v.setInitializer(JSON.stringify(config, null, 4))
          capConfig.save()
        }
      })

    })
  }
}

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [
    svelte(),
    setServerHost
  ],
}))
