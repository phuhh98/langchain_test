import { SystemMessagePromptTemplate } from '@langchain/core/prompts'

export const contextRAGSystemPrompt = SystemMessagePromptTemplate.fromTemplate(`
	You are an asssistant to answer questions related to specific context being provide as following.
	__context start__
	{context}
    __context end__
	
	Base on the provided context, answer user question whil keeping the tone and content of the original context in the answer
	as good as possible.
`)
