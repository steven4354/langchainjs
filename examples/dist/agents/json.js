import { OpenAI } from "langchain";
import * as fs from "fs";
import * as yaml from "js-yaml";
import { JsonSpec } from "langchain/tools";
import { JsonToolkit, createJsonAgent } from "langchain/agents";
export const run = async () => {
    let data;
    try {
        const yamlFile = fs.readFileSync("openai_openapi.yaml", "utf8");
        data = yaml.load(yamlFile);
        if (!data) {
            throw new Error("Failed to load OpenAPI spec");
        }
    }
    catch (e) {
        console.error(e);
        return;
    }
    const toolkit = new JsonToolkit(new JsonSpec(data));
    const model = new OpenAI({ temperature: 0 });
    const executor = createJsonAgent(model, toolkit);
    const input = `What are the required parameters in the request body to the /completions endpoint?`;
    console.log(`Executing with input "${input}"...`);
    const result = await executor.call({ input });
    console.log(`Got output ${result.output}`);
    console.log(`Got intermediate steps ${JSON.stringify(result.intermediateSteps, null, 2)}`);
};
//# sourceMappingURL=json.js.map