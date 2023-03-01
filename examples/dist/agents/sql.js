import { OpenAI } from "langchain";
import { SqlDatabase } from "langchain/tools";
import { createSqlAgent, SqlToolkit } from "langchain/agents";
import sqlite3 from "sqlite3";
/** This example uses Chinook database, which is a sample database available for SQL Server, Oracle, MySQL, etc.
 * To set it up follow the instructions on https://database.guide/2-sample-databases-sqlite/, placing the .db file
 * in the examples folder.
 */
export const run = async () => {
    const db = await new sqlite3.Database("Chinook.db");
    const tookit = new SqlToolkit(new SqlDatabase(db));
    const model = new OpenAI({ temperature: 0 });
    const executor = createSqlAgent(model, tookit);
    const input = `List the total sales per country. Which country's customers spent the most?`;
    console.log(`Executing with input "${input}"...`);
    const result = await executor.call({ input });
    console.log(`Got output ${result.output}`);
    console.log(`Got intermediate steps ${JSON.stringify(result.intermediateSteps, null, 2)}`);
    db.close();
};
//# sourceMappingURL=sql.js.map