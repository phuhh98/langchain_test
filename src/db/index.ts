import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'mysql',
    username: 'root',
    password: 'admin',
    database: 'employees',
})

export async function connect() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        throw error
    }
}
