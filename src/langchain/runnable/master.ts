import {
    RunnableMap,
    RunnableBranch,
    RunnablePassthrough,
    RunnableSequence,
} from '@langchain/core/runnables'
import {
    SystemMessagePromptTemplate,
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
} from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { employeeSqlAgent } from '../agent'
import { gptModel } from '../model'
import { match } from 'assert'
import fs from 'node:fs'
import path from 'path'

const keyWords = [
    'employee',
    'department',
    'manager',
    'salary',
    'salaries',
    'title',
]
const matcher = new RegExp(`${keyWords.join('|')}`)

const dbSchema = fs.readFileSync(
    path.resolve(__dirname, '../../db/sql_schema/employees.sql')
)

const generalPromptSys = SystemMessagePromptTemplate.fromTemplate(`
	You are a general purpose asssistant help me to answer some question from the user about the employee data base which is base on the db schema below.
	Answer with the sql query to extract relevant data and a brief explaination.
	Answer no less than 100 words for unrelevant questions.
	Base on the following db schema:
	${dbSchema}
`)
const userMessage = HumanMessagePromptTemplate.fromTemplate('{question}')

const general = ChatPromptTemplate.fromMessages([generalPromptSys, userMessage])
const outputParser = new StringOutputParser()

const commonChain = general.pipe(gptModel).pipe(outputParser)

const parrallel = RunnableMap.from({
    common: RunnableSequence.from([
        { question: new RunnablePassthrough() },
        commonChain,
    ]),
    sql: RunnableSequence.from([
        { question: new RunnablePassthrough() },
        employeeSqlAgent,
    ]),
})

const sequence2 = RunnableSequence.from([
    { question: new RunnablePassthrough() },
    parrallel,
])

const branch = RunnableBranch.from([
    [
        (x: { question: string }) => {
            console.log(x)
            console.log(matcher.test(x.question))

            return matcher.test(x.question)
        },
        sequence2,
    ],
    {
        common: commonChain,
        sql: {},
    },
])

export const master = RunnableSequence.from([
    { question: new RunnablePassthrough() },
    branch,
])
