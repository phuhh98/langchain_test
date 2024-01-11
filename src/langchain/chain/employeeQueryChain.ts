import { StringOutputParser } from '@langchain/core/output_parsers'
import { chatModel } from '../model'
import { employeeQueryPrompt } from '../prompt'

const outputParser = new StringOutputParser()

export const employeeQueryChain = employeeQueryPrompt.pipe(chatModel)
// .pipe(outputParser)
