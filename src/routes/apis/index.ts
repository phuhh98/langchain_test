import { Router, Request, Response, NextFunction } from 'express'
import formidable, { errors as formidableErrors } from 'formidable'

import { master } from '../../langchain/runnable'
import { plasticWasteVectorStoreCreator } from '../../db'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { v1 as uuid } from 'uuid'
import fs from 'node:fs'
import path from 'node:path'
import { rimrafSync } from 'rimraf'

export const apiRouter = Router()

// Endpoint to receive question and resolve it
apiRouter.post(
    '/bot',
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

// Endpoint to upload unstructure pdf file
apiRouter.post(
    '/upload/pdf',
    async (
        req: Request<object, object, object>,
        res: Response<{
            status: number
            data: object | string
        }>,
        next: NextFunction
    ) => {
        const RANDOM_ID = uuid()
        const TEMP_DIR = path.resolve(__dirname, RANDOM_ID)
        fs.mkdirSync(TEMP_DIR)
        try {
            const ALLOW_MIMETYPE = ['application/pdf']
            const plasticWasteVectorStore =
                await plasticWasteVectorStoreCreator()

            const form = formidable({
                filter: (part) => {
                    console.log(ALLOW_MIMETYPE.includes(part.mimetype))
                    if (ALLOW_MIMETYPE.includes(part.mimetype)) return true
                    else false
                    // else throw new Error(`${part.mimetype} is not supported`)
                },
                keepExtensions: true,
                filename: (name, ext, part, _) => `${name}-${RANDOM_ID}${ext}`,
                uploadDir: TEMP_DIR,
            })

            const [_, files] = await form.parse<string, 'file'>(req)

            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1536,
                chunkOverlap: 300,
                separators: ['|', '##', '>', '-', '\n\n', '\n', ' '],
            })

            const fileDataLoader = new PDFLoader(files.file[0].filepath, {
                splitPages: false,
            })
            const docs = await fileDataLoader.load()

            const splitted = await splitter.splitDocuments(docs)

            fs.writeFileSync(
                path.resolve(TEMP_DIR, 'document.json'),
                JSON.stringify(splitted)
            )

            console.log('file', files.file)

            // await plasticWasteVectorStore.addDocuments([
            //     {
            //         pageContent: 'cat has four two arms',
            //         metadata: { a: 1 },
            //     },
            //     { pageContent: 'I am a human', metadata: { a: 0 } },
            // ])

            // const results = await plasticWasteVectorStore.similaritySearch(
            //     'cat',
            //     10
            // )
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                data: error.message,
            })
        } finally {
            /**
             * Todo: need to resolve this to clear temp files
             */
            // rimrafSync(TEMP_DIR)
        }
    }
)
