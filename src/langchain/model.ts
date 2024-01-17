import { ChatOpenAI, OpenAI, OpenAIEmbeddings } from '@langchain/openai'

export const chatModel = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0
})

export const gptModel = () =>
    new OpenAI({
        modelName: 'gpt-3.5-turbo',
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0
    })

export const embeddingModel = new OpenAIEmbeddings({
    batchSize: process.env.MAX_EMBEDDING_BATCH_SIZE,
    modelName: 'text-embedding-ada-002',
    openAIApiKey: process.env.OPENAI_API_KEY
})
