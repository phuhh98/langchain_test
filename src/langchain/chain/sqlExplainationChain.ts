import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'

import { chatModel } from '../model'
import { sqlExplainationPrompt } from '../prompt'
import { employeeQueryChain } from './employeeQueryChain'

export const combinedChain = RunnableSequence.from([
    {
        query_string: employeeQueryChain,
        queried_data: (input) => input.queried_data,
        question: (input) => input.question,
    },
    sqlExplainationPrompt,
    chatModel,
    new StringOutputParser(),
])
