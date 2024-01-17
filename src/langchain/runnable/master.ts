import { RunnableBranch, RunnableMap } from '@langchain/core/runnables'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'

import { chatModel } from '../model'
import {
    GeolocationResponse,
    SQLAssisstantResponse,
    geolocationExtractor,
    sqlAssistantOuput
} from '../openAI_functions'
import { generalPrompt, geolocationPrompt } from '../prompts'
import { contextRAGChain } from './contextRAG'

const dbKeywordsRegex = new RegExp(['employee', 'title', 'salary', 'salaries', 'department', 'manage'].join('|'))

const generalAssisstantChain = generalPrompt
    .pipe(
        chatModel.bind({
            function_call: { name: sqlAssistantOuput.name },
            functions: [sqlAssistantOuput]
        })
    )
    .pipe(new JsonOutputFunctionsParser<SQLAssisstantResponse>())

// Switcher to switch between prompt for db and general or context RAG
const contextSwitcherChain = RunnableBranch.from([
    [(input: { question: string }) => dbKeywordsRegex.test(input.question.toLowerCase()), generalAssisstantChain],
    contextRAGChain
])

const geolocationChain = geolocationPrompt
    .pipe(
        chatModel.bind({
            function_call: { name: geolocationExtractor.name },
            functions: [geolocationExtractor]
        })
    )
    .pipe(new JsonOutputFunctionsParser<GeolocationResponse>())

type InputParams = Parameters<typeof generalAssisstantChain.invoke>[0] | Parameters<typeof geolocationChain.invoke>[0]

type OutputParams = {
    location: Awaited<ReturnType<typeof geolocationChain.invoke>>
    message:
        | Awaited<ReturnType<typeof contextRAGChain.invoke>>
        | Awaited<ReturnType<typeof generalAssisstantChain.invoke>>
}

export const master = RunnableMap.from<InputParams, OutputParams>({
    location: geolocationChain,
    message: contextSwitcherChain
})
