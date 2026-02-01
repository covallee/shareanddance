/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string
  readonly PUBLIC_SANITY_DATASET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
