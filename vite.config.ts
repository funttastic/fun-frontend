import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dynamicImport from 'vite-plugin-dynamic-import'
// import fs from 'fs'
// import https from 'https'
import { env } from 'process'
// import * as os from 'os'

// const frontendRestProtocol: string = env['FUN_FRONTEND_REST_PROTOCOL'] || 'http'
// const frontendWebSocketProtocol: string = env['FUN_FRONTEND_WEBSOCKET_PROTOCOL'] || 'ws';
// const frontendHost: string = env['FUN_FRONTEND_HOST'] || 'localhost'
const frontendPort: number = env['FUN_FRONTEND_PORT'] ? Number(env['FUN_FRONTEND_PORT']) : 50000
// const frontendPrefix = ''
// const frontendBaseUrlPrefix = `${frontendHost}:${frontendPort}${frontendPrefix}`

// const apiRestProtocol: string = env['VITE_FUN_CLIENT_REST_PROTOCOL'] || 'https'
const apiWebSocketProtocol: string = env['VITE_FUN_CLIENT_WEBSOCKET_PROTOCOL'] || 'wss';
const apiHost: string = env['VITE_FUN_CLIENT_HOST'] || 'localhost'
const apiPort: number = env['VITE_FUN_CLIENT_PORT'] ? Number(env['VITE_FUN_CLIENT_PORT']) : 443
const apiPrefix: string = env['VITE_FUN_CLIENT_PREFIX'] || '/api'
const apiBaseUrlPrefix = `${apiHost}:${apiPort}${apiPrefix}`

const filebrowserRestProtocol: string = env['VITE_FILEBROWSER_REST_PROTOCOL'] || 'http'
const filebrowserHost: string = env['VITE_FILEBROWSER_HOST'] || 'localhost'
const filebrowserPort: number = env['VITE_FILEBROWSER_PORT'] ? Number(env['VITE_FILEBROWSER_PORT']) : 443
const filebrowserPrefix: string = env['VITE_FILEBROWSER_PREFIX'] || '/filebrowser'
const filebrowserBaseUrlPrefix = `${filebrowserHost}:${filebrowserPort}${filebrowserPrefix}`


env['VITE_FUN_CLIENT_WEBSOCKET_PROTOCOL'] = apiWebSocketProtocol
env['VITE_FUN_CLIENT_BASE_URL_PREFIX'] = apiBaseUrlPrefix
env['VITE_FILEBROWSER_REST_PROTOCOL'] = filebrowserRestProtocol
env['VITE_FILEBROWSER_BASE_URL_PREFIX'] = filebrowserBaseUrlPrefix

// const clientCertificatePath: string = env['FUN_CLIENT_CERTIFICATE_PATH'] || path.join(os.homedir(), 'funttastic', 'client', 'resources', 'certificates', 'client_cert.pem')
// const clientKeyPath: string = env['FUN_CLIENT_KEY_CERTIFICATE_PATH'] || path.join(os.homedir(), 'funttastic', 'client', 'resources', 'certificates', 'client_key.pem')
// const certificationAuthorityCertificatePath: string = env['FUN_CERTIFICATION_AUTHORITY_CERTIFICATE_PATH'] || path.join(os.homedir(), 'funttastic', 'client', 'resources', 'certificates', 'ca_cert.pem')

// const clientCert = fs.readFileSync(clientCertificatePath)
// const clientKey = fs.readFileSync(clientKeyPath)
// const certificationAuthorityCertificate = fs.readFileSync(certificationAuthorityCertificatePath)

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    server: {
        port: frontendPort,
        // proxy: {
        //     '/api/ws': {
        //         target: `${apiWebSocketProtocol}://${apiBaseUrlPrefix}`,
        //         changeOrigin: true,
        //         secure: true,
        //         rewrite: (path) => {
        //             const newPath = path.replace(/^\/api\/ws/, '/ws');

        //             return newPath
        //         },
        //         configure: (_proxy, options) => {
        //             options.agent = new https.Agent({
        //                 key: clientKey,
        //                 cert: clientCert,
        //                 ca: certificationAuthorityCertificate,
        //                 rejectUnauthorized: false,
        //             })
        //         },
        //     },
        //     '/api': {
        //         target: `${apiRestProtocol}://${apiBaseUrlPrefix}`,
        //         changeOrigin: true,
        //         secure: true,
        //         rewrite: (path) => {
        //             return path.replace(/^\/api/, '')
        //         },
        //         configure: (_proxy, options) => {
        //             options.agent = new https.Agent({
        //                 key: clientKey,
        //                 cert: clientCert,
        //                 ca: certificationAuthorityCertificate,
        //                 rejectUnauthorized: false,
        //             })
        //         },
        //     },
        // },
    },
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-macros']
            }
        }),
        dynamicImport(),
    ],
    assetsInclude: ['**/*.md'],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    build: {
        outDir: 'build'
    }
})
