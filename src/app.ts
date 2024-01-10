import { connect, sequelize } from './db'

async function appStart() {
    await connect()
    const response = await sequelize.query(
        `SELECT * from employees where first_name like 'a%' limit 10 offset 10`
    )

    console.log(response)
}

appStart()
