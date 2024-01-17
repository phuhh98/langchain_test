declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MAX_EMBEDDING_BATCH_SIZE: number
            OPENAI_API_KEY: string
            PG_HOST: string
            PG_PASSWORD: string
            PG_PORT: number
            PG_USER: string
            PG_VECTOR_DB: string
            PORT: string
        }
    }
}

export {}
