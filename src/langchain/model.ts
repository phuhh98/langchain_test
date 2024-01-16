import { ChatOpenAI, OpenAI, OpenAIEmbeddings } from '@langchain/openai'

export const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
})

export const gptModel = () =>
    new OpenAI({
        temperature: 0,
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: 'gpt-3.5-turbo',
    })

export const embeddingModel = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'text-embedding-ada-002',
    batchSize: 1024,
})
