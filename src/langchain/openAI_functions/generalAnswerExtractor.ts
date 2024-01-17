import { FunctionDefinition } from '@langchain/core/dist/language_models/base'

export const generalAnswerExtractor: FunctionDefinition = {
    description: 'parse answer and put it into object property',
    name: 'generalAnswerExtractor',
    parameters: {
        properties: {
            answer: {
                description: 'The answer goes here',
                type: 'string'
            }
        },
        type: 'object'
    }
}

export type GeneralAnswerResponse = {
    answer: string
}
