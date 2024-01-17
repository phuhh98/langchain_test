import { Request, Response, Router } from 'express'
import formidable /*, { errors as formidableErrors }*/ from 'formidable'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { error } from 'node:console'
import fs from 'node:fs'
import path from 'node:path'
import { rimraf } from 'rimraf'
import { v1 as uuid } from 'uuid'

import { OriginalDocumentRepository, plasticWasteVectorStoreCreator } from '../../db'
import { master } from '../../langchain/runnable'
import { createSHA256, splitIntoBatches } from '../../utils'

export const apiRouter = Router()

// Endpoint to receive question and resolve it
apiRouter.post(
    '/bot',
    async (
        req: Request<
            object,
            object,
            {
                chat_history?: [{ message: string; role: 'user' }, { message: string; role: 'ai' }][]
                question: string
            }
        >,
        res: Response<{
            data: object | string
            status: number
        }>
    ) => {
        const { question } = req.body

        const result = await master.invoke({ question })

        // console.log(result)

        return res.json({
            data: result,
            status: 200
        })
    }
)

// Endpoint to upload unstructure pdf file
apiRouter.post(
    '/upload/pdf',
    async (
        req: Request<object, object, object>,
        res: Response<{
            data: object | string
            error?: object | string
            status: number
        }>
    ) => {
        const RANDOM_ID = uuid()
        const TEMP_DIR = path.resolve(__dirname, RANDOM_ID)
        fs.mkdirSync(TEMP_DIR)
        try {
            const ALLOW_MIMETYPE = ['application/pdf']

            // Parse form data
            const form = formidable({
                filename: (name, ext) => `${name}-${RANDOM_ID}${ext}`,
                filter: (part) => {
                    if (ALLOW_MIMETYPE.includes(part.mimetype)) return true
                    else false
                },
                keepExtensions: true,
                uploadDir: TEMP_DIR
            })

            const [_, files] = await form.parse<string, 'file'>(req)

            // create file sha256 hash to check duplication of uploading files
            const fileSHA256 = createSHA256(await fs.readFileSync(files.file[0].filepath))
            const originDocItem = OriginalDocumentRepository.create({
                metadata: {},
                sha256_hash: fileSHA256
            })
            // Will throw error on duplication file content
            try {
                await OriginalDocumentRepository.save([originDocItem])
            } catch (error) {
                if ((error as Error).message?.toLowerCase().includes('duplicate')) {
                    return res.json({
                        data: null,
                        error: 'upload duplicate document. Can not proceed.',
                        status: 400
                    })
                } else {
                    throw error
                }
            }

            // Prepare to split file data into chunks
            const splitter = new RecursiveCharacterTextSplitter({
                chunkOverlap: 400,
                chunkSize: 2000
            })

            const fileDataLoader = new PDFLoader(files.file[0].filepath, {
                splitPages: false
            })

            const documents = await fileDataLoader.load()

            // Format to remove redundant characters before feed to create embeddings
            documents.forEach((doc) => {
                doc.pageContent = doc.pageContent.replace(/(\s*?\n+)+/gm, '\n')
                doc.pageContent = doc.pageContent.replace(/\.{4,}/gm, '...')
                doc.pageContent = doc.pageContent.replace(/\s{2,}/gm, ' ')
            })

            const splittedDocs = await splitter.splitDocuments(documents)

            const batches = splitIntoBatches(splittedDocs)

            // Use vectorStore wrapper to simplify process of create and store embedding
            const plasticWasteVectorStore = await plasticWasteVectorStoreCreator()

            // Save documents to vectore store batch by batch
            for (const batch of batches) {
                await plasticWasteVectorStore.addDocuments(batch)
            }

            const results = await plasticWasteVectorStore.similaritySearch('fore word indonesia', 5)

            console.log(results)

            return res.json({
                data: results,
                status: 200
            })
        } catch (error) {
            console.log(error)
            return res.json({
                data: error.message,
                status: 500
            })
        } finally {
            rimraf(TEMP_DIR).catch((error) => {
                console.log(error)
            })
        }
    }
)
