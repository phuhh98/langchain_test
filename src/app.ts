import 'reflect-metadata'
import { config } from 'dotenv'
config({
    path: './.env',
})

import express from 'express'
import { router } from './routes'

async function appStart() {
    const app = express()
    app.use(express.json())

    app.use(router)

    app.listen(process.env.PORT, () => {
        console.log(
            `[server]: Server is running at http://localhost:${process.env.PORT}`
        )
    })
}

appStart()
