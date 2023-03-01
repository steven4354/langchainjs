import { OpenAI } from "langchain/llms";
export const run = async () => {
    const model = new OpenAI({ temperature: 0.9 });
    const res = await model.call("What would be a good company name a company that makes colorful socks?");
    console.log({ res });
};
//# sourceMappingURL=llm.js.map