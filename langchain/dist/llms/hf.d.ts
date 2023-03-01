import type HuggingFaceT from "huggingface";
import { LLM, LLMCallbackManager } from "./index.js";
interface HFInput {
    /** Model to use */
    model: string;
}
export declare class HuggingFaceInference extends LLM implements HFInput {
    model: string;
    constructor(fields?: Partial<HFInput> & {
        callbackManager?: LLMCallbackManager;
        verbose?: boolean;
        concurrency?: number;
        cache?: boolean;
    });
    _llmType(): string;
    _call(prompt: string, _stop?: string[]): Promise<string>;
    static imports(): Promise<{
        HuggingFace: typeof HuggingFaceT;
    }>;
}
export {};
