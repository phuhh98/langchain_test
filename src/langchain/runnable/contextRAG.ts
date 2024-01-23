import { RunnableSequence } from '@langchain/core/runnables'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { ContextualCompressionRetriever } from 'langchain/retrievers/contextual_compression'
import { EmbeddingsFilter } from 'langchain/retrievers/document_compressors/embeddings_filter'
import { formatDocumentsAsString } from 'langchain/util/document'

import { plasticWasteVectorStoreCreator } from '../../db'
import { chatModel, embeddingModel } from '../model'
import { GeneralAnswerResponse, generalAnswerExtractor } from '../openAI_functions'
import { contextRAGPrompt } from '../prompts'

export const contextRAGChain = RunnableSequence.from([
    {
        context: async (input: { question: string }) => {
            const baseCompressor = new EmbeddingsFilter({
                embeddings: embeddingModel,
                similarityThreshold: 0.8
            })
            const vectorStoreRetriever = (await plasticWasteVectorStoreCreator()).asRetriever({
                k: 10,
                searchType: 'similarity'
            })

            const contextualRetriever = new ContextualCompressionRetriever({
                baseCompressor,
                baseRetriever: vectorStoreRetriever
            })

            const relevantDocs = await contextualRetriever.getRelevantDocuments(input.question)

            console.log(relevantDocs)
            return formatDocumentsAsString(relevantDocs)
        },
        question: (input: { question: string }) => input.question
    },
    contextRAGPrompt,
    chatModel.bind({
        function_call: { name: generalAnswerExtractor.name },
        functions: [generalAnswerExtractor]
    }),
    new JsonOutputFunctionsParser<GeneralAnswerResponse>()
])
