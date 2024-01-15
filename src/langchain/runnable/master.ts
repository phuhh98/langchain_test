import { RunnableMap } from '@langchain/core/runnables'

import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { chatModel } from '../model'
import {
    GeolocationResponse,
    SQLAssisstantResponse,
    geolocationExtractor,
    sqlAssistantOuput,
} from '../openAI_functions'
import { generalPrompt, geolocationPrompt } from '../prompts'

const generalAssisstantChain = generalPrompt
    .pipe(
        chatModel.bind({
            functions: [sqlAssistantOuput],
            function_call: { name: sqlAssistantOuput.name },
        })
    )
    .pipe(new JsonOutputFunctionsParser<SQLAssisstantResponse>())

const geolocationChain = geolocationPrompt
    .pipe(
        chatModel.bind({
            functions: [geolocationExtractor],
            function_call: { name: geolocationExtractor.name },
        })
    )
    .pipe(new JsonOutputFunctionsParser<GeolocationResponse>())

type InputParams =
    | Parameters<typeof generalAssisstantChain.invoke>[0]
    | Parameters<typeof geolocationChain.invoke>[0]

type OutputParams = {
    message: Awaited<ReturnType<typeof generalAssisstantChain.invoke>>
    location: Awaited<ReturnType<typeof geolocationChain.invoke>>
}

export const master = RunnableMap.from<InputParams, OutputParams>({
    message: generalAssisstantChain,
    location: geolocationChain,
})
