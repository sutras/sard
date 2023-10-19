declare module 'virtual:sard-config'

declare namespace NodeJS {
  interface ProcessEnv {
    SARD_URL: string
  }
}
