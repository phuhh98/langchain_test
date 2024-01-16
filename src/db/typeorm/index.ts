import { ColumnType, DataSource, DataSourceOptions } from 'typeorm'
import {
    Department,
    DepartmentEmployee,
    DepartmentManager,
    Employee,
    Salary,
    Title,
} from './entities/employees'
import { Chunks, FileUploadTrack } from './entities/plastic_waste'

import { PGVectorStore } from '@langchain/community/vectorstores/pgvector'
import { PoolConfig } from 'pg'
import { embeddingModel } from '../../langchain'

export const employeeDataSource = new DataSource({
    type: 'mysql',
    database: 'employees',
    username: 'root',
    password: 'admin',
    entities: [
        Employee,
        Department,
        DepartmentEmployee,
        DepartmentManager,
        Title,
        Salary,
    ],
    host: '127.0.0.1',
    port: 3306,
})

export const dataSourceFactory = (options?: DataSourceOptions): DataSource => {
    const dataSource = new DataSource(options)
    dataSource.driver.supportedDataTypes.push('vector' as ColumnType)
    dataSource.driver.withLengthColumnTypes.push('vector' as ColumnType)
    return dataSource
}

// export const plasticWasteDataSource = dataSourceFactory({
//     type: 'postgres',
//     database: 'plastic_waste',
//     username: 'postgres',
//     password: 'admin123',
//     entities: [Chunks, FileUploadTrack],
//     host: '127.0.0.1',
//     port: 5432,
// })

const plasticWasteConnectionOptions: PoolConfig = {
    database: 'plastic_waste',
    user: 'postgres',
    password: 'admin123',
    host: '127.0.0.1',
    port: 5432,
}

export const plasticWasteVectorStoreCreator = async () =>
    PGVectorStore.initialize(embeddingModel, {
        postgresConnectionOptions: plasticWasteConnectionOptions,
        tableName: 'chunks',
        columns: {
            idColumnName: 'id', // big int
            vectorColumnName: 'embedding', // vector
            contentColumnName: 'content', // string
            metadataColumnName: 'metadata', // json
        },
    })
