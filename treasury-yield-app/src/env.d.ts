/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_GATEWAY_URL: string | undefined;
  readonly VITE_USER_ID: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
