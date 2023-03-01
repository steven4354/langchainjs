import { LLM, LLMCallbackManager } from "./index.js";
interface CohereInput {
    /** Sampling temperature to use */
    temperature: number;
    /**
     * Maximum number of tokens to generate in the completion. -1 returns as many
     * tokens as possible given the prompt and the model's maximum context size.
     */
    maxTokens: number;
    /** Model to use */
    model: string;
}
export declare class Cohere extends LLM implements CohereInput {
    temperature: number;
    maxTokens: number;
    model: string;
    apiKey: string;
    constructor(fields?: Partial<CohereInput> & {
        callbackManager?: LLMCallbackManager;
        verbose?: boolean;
        concurrency?: number;
        cache?: boolean;
    });
    _llmType(): string;
    _call(prompt: string, _stop?: string[]): Promise<string>;
    static imports(): Promise<{
        cohere: typeof import("cohere-ai");
    }>;
}
export {};
