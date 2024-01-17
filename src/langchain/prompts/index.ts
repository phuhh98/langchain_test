import { ChatPromptTemplate } from '@langchain/core/prompts'

import {
    contextRAGSystemPrompt,
    generalSystemPrompt,
    geoLocationSystemPrompt,
    userQuestionPrompt
} from './messageComponents'

export const generalPrompt = ChatPromptTemplate.fromMessages<{
    question: string
}>([generalSystemPrompt, userQuestionPrompt])

export const geolocationPrompt = ChatPromptTemplate.fromMessages<{
    question: string
}>([geoLocationSystemPrompt, userQuestionPrompt])

export const contextRAGPrompt = ChatPromptTemplate.fromMessages<{
    context: string
    question: string
}>([contextRAGSystemPrompt, userQuestionPrompt])
