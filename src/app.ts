import 'reflect-metadata'
import { config } from 'dotenv'
config({
    path: './.env',
})

import express, { NextFunction, Request, Response } from 'express'
import { master } from './langchain/runnable'

async function appStart() {
    const app = express()
    app.use(express.json())

    // Endpoint to receive question and resolve it
    app.post(
        '/api/bot',
        async (
            req: Request<
                object,
                object,
                {
                    question: string
                    chat_history?: [
                        { role: 'user'; message: string },
                        { role: 'ai'; message: string }
                    ][]
                }
            >,
            res: Response<{
                status: number
                data: object | string
            }>,
            next: NextFunction
        ) => {
            const { question } = req.body

            const result = await master.invoke({ question })

            console.log(result)

            return res.json({
                status: 200,
                data: result,
            })
        }
    )

    app.listen(process.env.PORT, () => {
        console.log(
            `[server]: Server is running at http://localhost:${process.env.PORT}`
        )
    })
}

appStart()
