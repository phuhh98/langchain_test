import { PGVectorStore } from '@langchain/community/vectorstores/pgvector'
import { PoolConfig } from 'pg'
import { DataSource } from 'typeorm'

import { embeddingModel } from '../../langchain'
import { OriginalDocument, PlasticWasteEmbedding } from './entities/pgvector'

// TypeORM datasource
const plasticWasteTypeORMDataSource = new DataSource({
    database: process.env.PG_VECTOR_DB,
    entities: [OriginalDocument, PlasticWasteEmbedding],
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT),
    type: 'postgres',
    username: process.env.PG_USER
})

export const connectDB = async () => {
    await plasticWasteTypeORMDataSource.initialize()
}

export const OriginalDocumentRepository = plasticWasteTypeORMDataSource.getRepository(OriginalDocument)

// vectorStore wrapper
const plasticWasteConnectionOptions: PoolConfig = {
    database: process.env.PG_VECTOR_DB,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT),
    user: process.env.PG_USER
}

export const plasticWasteVectorStoreCreator = async () =>
    PGVectorStore.initialize(embeddingModel, {
        columns: {
            contentColumnName: 'content', // string
            idColumnName: 'id', // big int
            metadataColumnName: 'metadata', // json
            vectorColumnName: 'embedding' // vector
        },
        postgresConnectionOptions: plasticWasteConnectionOptions,
        tableName: 'plastic_waste_chunks'
    })
