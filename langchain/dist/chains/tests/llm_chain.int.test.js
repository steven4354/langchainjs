import { test } from "@jest/globals";
import { OpenAI } from "../../llms/openai.js";
import { PromptTemplate } from "../../prompts/index.js";
import { LLMChain, ConversationChain } from "../llm_chain.js";
import { loadChain } from "../load.js";
test("Test OpenAI", async () => {
    const model = new OpenAI({ modelName: "text-ada-001" });
    const prompt = new PromptTemplate({
        template: "Print {foo}",
        inputVariables: ["foo"],
    });
    const chain = new LLMChain({ prompt, llm: model });
    const res = await chain.call({ foo: "my favorite color" });
    console.log({ res });
});
test("Test run method", async () => {
    const model = new OpenAI({ modelName: "text-ada-001" });
    const prompt = new PromptTemplate({
        template: "Print {foo}",
        inputVariables: ["foo"],
    });
    const chain = new LLMChain({ prompt, llm: model });
    const res = await chain.run("my favorite color");
    console.log({ res });
});
test("Test apply", async () => {
    const model = new OpenAI({ modelName: "text-ada-001" });
    const prompt = new PromptTemplate({
        template: "Print {foo}",
        inputVariables: ["foo"],
    });
    const chain = new LLMChain({ prompt, llm: model });
    const res = await chain.apply([{ foo: "my favorite color" }]);
    console.log({ res });
});
test("Load chain from hub", async () => {
    const chain = await loadChain("lc://chains/hello-world/chain.json");
    const res = await chain.call({ topic: "my favorite color" });
    console.log({ res });
});
test("Test ConversationChain", async () => {
    const model = new OpenAI({ modelName: "text-ada-001" });
    const chain = new ConversationChain({ llm: model });
    const res = await chain.call({ input: "my favorite color" });
    console.log({ res });
});
//# sourceMappingURL=llm_chain.int.test.js.map