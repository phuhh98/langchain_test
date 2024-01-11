import { config } from 'dotenv'
config({
    path: './.env',
})

import express, { NextFunction, Request, Response } from 'express'
import { connect, sequelize } from './db'
import { combinedChain, employeeQueryChain } from './langchain'
import { stringify } from 'csv-stringify/sync'

async function appStart() {
    await connect()

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
                data: { ai_message: string | object; data?: object }
            }>,
            next: NextFunction
        ) => {
            const { question, chat_history } = req.body

            const ai_response = await employeeQueryChain.invoke({
                question,
                chat_history: chat_history ?? [],
            })

            let queried_data: Awaited<
                ReturnType<typeof sequelize.query>
            > | null = null
            if (ai_response.content) {
                try {
                    queried_data = await sequelize.query(
                        ai_response.content.toString()
                    )
                } catch (err) {
                    console.log(err)
                }
            }

            // console.log('ai_response: ', ai_response)
            const resData = await combinedChain.invoke({
                question,
                queried_data: stringify((queried_data as [][])[1]),
            })

            console.log('resData', resData)

            return res.json({
                status: 200,
                data: {
                    ai_message: resData,
                    data: (queried_data as object[])[1],
                },
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
