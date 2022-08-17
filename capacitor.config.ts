import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
            "appId": "com.example.app",
            "appName": "svelte-capacitor-ts",
            "webDir": "dist",
            "bundledWebRuntime": false,
            "server": {
                "url": "http://localhost:5173",
                "cleartext": true
            }
        };

export default config;
