import { RunnableSequence } from '@langchain/core/runnables'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { formatDocumentsAsString } from 'langchain/util/document'

import { plasticWasteVectorStoreCreator } from '../../db'
import { chatModel } from '../model'
import { GeneralAnswerResponse, generalAnswerExtractor } from '../openAI_functions'
import { contextRAGPrompt } from '../prompts'

export const contextRAGChain = RunnableSequence.from([
    {
        context: async (input: { question: string }) => {
            const vectorStoreRetriever = (await plasticWasteVectorStoreCreator()).asRetriever({
                k: 3,
                searchType: 'similarity'
            })

            const relevantDocs = await vectorStoreRetriever.getRelevantDocuments(input.question)
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
