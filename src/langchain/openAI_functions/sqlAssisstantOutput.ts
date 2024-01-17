import { FunctionDefinition } from '@langchain/core/dist/language_models/base'

export const sqlAssistantOuput: FunctionDefinition = {
    description: 'parse response of the sql assissant in to JSON object format',
    name: 'sqlAssistantOuput',
    parameters: {
        properties: {
            SQL_query: {
                description: 'the SQL query',
                type: 'string'
            },
            answer: {
                description: 'the answer for unrelevant to SQL or database',
                type: 'string'
            },
            explaination: {
                description: 'a short explaination for the queried',
                type: 'string'
            }
        },
        type: 'object'
    }
}

export type SQLAssisstantResponse =
    | {
          SQL_query: string
          explaination: string
      }
    | {
          answer: string
      }
