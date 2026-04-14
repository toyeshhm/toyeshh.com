/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_URL?: string;
  readonly VITE_MISTRAL_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
