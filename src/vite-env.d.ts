/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportEnv {
  readonly env: ImportMetaEnv;
}
