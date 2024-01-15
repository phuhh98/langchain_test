import { FunctionDefinition } from '@langchain/core/dist/language_models/base'

export const sqlAssistantOuput: FunctionDefinition = {
    name: 'sqlAssistantOuput',
    description: 'parse response of the sql assissant in to JSON object format',
    parameters: {
        type: 'object',
        properties: {
            answer: {
                type: 'string',
                description: 'the answer for unrelevant to SQL or database',
            },
            SQL_query: {
                type: 'string',
                description: 'the SQL query',
            },
            explaination: {
                type: 'string',
                description: 'a short explaination for the queried',
            },
        },
    },
}

export type SQLAssisstantResponse =
    | {
          answer: string
      }
    | {
          SQL_query: string
          explaination: string
      }
