import { LLM } from "./index.js";
export class HuggingFaceInference extends LLM {
    constructor(fields) {
        super(fields?.callbackManager, fields?.verbose, fields?.concurrency, fields?.cache);
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gpt2"
        });
        this.model = fields?.model ?? this.model;
    }
    _llmType() {
        return "huggingface_hub";
    }
    async _call(prompt, _stop) {
        if (process.env.HUGGINGFACEHUB_API_KEY === "") {
            throw new Error("Please set the HUGGINGFACEHUB_API_KEY environment variable");
        }
        const { HuggingFace } = await HuggingFaceInference.imports();
        const hf = new HuggingFace(process.env.HUGGINGFACEHUB_API_KEY ?? "");
        const res = await hf.textGeneration({
            model: this.model,
            inputs: prompt,
        });
        return res.generated_text;
    }
    static async imports() {
        try {
            const { default: HuggingFace } = await import("huggingface");
            return { HuggingFace };
        }
        catch (e) {
            throw new Error("Please install huggingface as a dependency with, e.g. `yarn add huggingface`");
        }
    }
}
//# sourceMappingURL=hf.js.map