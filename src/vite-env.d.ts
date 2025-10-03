/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_CLOUDINARY_URL: string;
}

interface ImportEnv {
  readonly env: ImportMetaEnv;
}
