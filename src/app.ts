import { config } from 'dotenv'
import 'reflect-metadata'
config({
    path: './.env'
})

import express from 'express'

import { connectDB } from './db'
import { router } from './routes'

async function appStart() {
    await connectDB()
    const app = express()
    app.use(express.json())

    app.use(router)

    app.listen(process.env.PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`)
    })
}

appStart()
