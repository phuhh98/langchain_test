export * from './prompt'
export * from './chain'
export * from './model'

import { StringOutputParser } from '@langchain/core/output_parsers'

export const outputStringParser = new StringOutputParser()
