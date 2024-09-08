/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
