import {
    ChatPromptTemplate,
    // MessagesPlaceholder,
} from '@langchain/core/prompts'

export const sqlExplainationPrompt = ChatPromptTemplate.fromMessages([
    // new MessagesPlaceholder('chat_history'),
    [
        'user',
        `Based on the queried result and the input question, provide a brief explaination about the return data with some comment, less than 100 words. Only in this questionaire you allow answer in natural language other than on SQL query string in repsonse.
	
	Question: {question}
	Query String: {query_string}
	Queried data: {queried_data}
	`,
    ],
])
