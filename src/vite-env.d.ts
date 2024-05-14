/// <reference types="vite/client" />


  interface ImportMetaEnv {
    VITE_WEBSOCKET_PORT?: string;
    VITE_SECRET_PORT?: number;
    VITE_PASSWORD?: string;
    VITE_HOST?: string;

  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
