import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from '@langchain/core/prompts'

import fs from 'node:fs'
import path from 'node:path'

export const db_schema = fs.readFileSync(
    path.resolve(__dirname, '../../sql/employees.sql')
)

export const employeeQueryPrompt = ChatPromptTemplate.fromMessages([
    [
        'system',
        `You are an agent to help me analyze the following sql database schema which is used to manage employees related data.
	You only have to answer question related to the data and database schema.
	Only return the SQL query string in response, no additional text.

	Database schema: 
	${db_schema.toString()}
	`,
    ],
    // new MessagesPlaceholder('chat_history'),

    ['user', '{question}'],
])
