/// <reference types="vite/client" />


  interface ImportMetaEnv {
   readonly VITE_WEBSOCKET_PORT?: string;
   readonly VITE_SECRET_PORT?: number;
   readonly  VITE_PASSWORD?: string;
   readonly  VITE_HOST?: string;

  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;

  }
