import { SqlDatabase } from 'langchain/sql_db'
import { createSqlAgent, SqlToolkit } from 'langchain/agents/toolkits/sql'
import { employeeDataSource } from '../../db/typeorm'
import { gptModel } from '../model'

export const employeeSqlAgent = async (question: string) => {
    const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: employeeDataSource,
    })

    const toolkit = new SqlToolkit(db, gptModel)

    const executor = createSqlAgent(gptModel, toolkit)

    console.log(`Executing with input "${question}"...`)

    const agentResult = await executor.invoke({ input: question })

    console.log(`Got output ${agentResult.output}`)

    console.log(
        `Got intermediate steps ${JSON.stringify(
            agentResult.intermediateSteps,
            null,
            2
        )}`
    )

    await employeeDataSource.destroy()

    return agentResult.output
}
