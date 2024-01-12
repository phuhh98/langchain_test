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
import {
    StringOutputParser,
    JsonOutputParser,
} from '@langchain/core/output_parsers'
import { employeeSqlAgent } from '../agent'
import { gptModel } from '../model'
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
	You are an asssistant to answer some questions from the user about the employee data base.
	Answer with the sql query to extract relevant data and give a brief explaination about it.
	You are allow to answer questions unrelated to this this database but return to more than 100 words.
	The reference mysql db schema is as follow:
	"""
    ${dbSchema}
    """

    The output should be an Object in JSON that have the following keys:
    "SQL_Query": "the query",
     "explain": "brief explaination about the query"
    
    With unrelated questions, the following keys is include:
    "anwers": "answer of the question"

    Add pair of curly braces the head and end of repsonse
`)

const geoLocationPromptSys = SystemMessagePromptTemplate.fromTemplate(`
    You have to find a place keywords in the question and return its geolocation - the most repeated one.
    Response will only have the following keys, no additional text:
    "geolocation": "object contain geo location pair of longitude and latitude and place_name of the location"

    If no place is in context, geolocation key in response will be an empty JSON object.

    Add pair of curly braces the head and end of repsonse
`)

const userMessage = HumanMessagePromptTemplate.fromTemplate('{question}')

const general = ChatPromptTemplate.fromMessages([generalPromptSys, userMessage])
const geolocationPrompt = ChatPromptTemplate.fromMessages([
    geoLocationPromptSys,
    userMessage,
])

const outputParser = new JsonOutputParser()

const commonChain = general.pipe(gptModel()).pipe(outputParser)
const geolocationChain = geolocationPrompt.pipe(gptModel()).pipe(outputParser)

const parrallel = RunnableMap.from({
    message: commonChain,
    location: geolocationChain,
})

// const sequence2 = RunnableSequence.from([
//     { question: new RunnablePassthrough() },
//     parrallel,
// ])

const branch = RunnableBranch.from([
    [
        (x: { question: string }) => {
            console.log(x)
            console.log(matcher.test(x.question))

            return matcher.test(x.question)
        },
        parrallel,
    ],
    {
        message: commonChain,
        location: geolocationChain,
    },
])

export const master = RunnableSequence.from([
    { question: new RunnablePassthrough() },
    branch,
])
