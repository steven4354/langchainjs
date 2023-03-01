import { test, expect } from "@jest/globals";
import { BufferMemory } from "../buffer_memory.js";
test("Test buffer memory", async () => {
    const memory = new BufferMemory();
    const result1 = await memory.loadMemoryVariables({});
    expect(result1).toStrictEqual({ history: "" });
    const result = new Promise((resolve, _reject) => {
        resolve({ bar: "foo" });
    });
    await memory.saveContext({ foo: "bar" }, result);
    const expectedString = "\nHuman: bar\nAI: foo";
    const result2 = await memory.loadMemoryVariables({});
    expect(result2).toStrictEqual({ history: expectedString });
});
//# sourceMappingURL=buffer_memory.test.js.map