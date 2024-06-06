/// <reference types="vite/client" />


interface ImportMetaEnv {
 readonly VITE_WEBSOCKET_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;

}
