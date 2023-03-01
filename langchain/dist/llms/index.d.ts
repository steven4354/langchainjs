export { BaseLLM, LLM, SerializedLLM } from "./base.js";
export { OpenAI, PromptLayerOpenAI } from "./openai.js";
export { Cohere } from "./cohere.js";
export { HuggingFaceInference } from "./hf.js";
export { loadLLM } from "./load.js";
export type LLMCallbackManager = {
    handleStart?: (llm: {
        name: string;
    }, prompts: string[], verbose?: boolean) => void;
    handleNewToken?: (token: string, verbose?: boolean) => void;
    handleError?: (err: string, verbose?: boolean) => void;
    handleEnd?: (output: LLMResult, verbose?: boolean) => void;
};
/**
 * Output of a single generation.
 */
export type Generation = {
    /**
     * Generated text output
     */
    text: string;
    /**
     * Raw generation info response from the provider.
     * May include things like reason for finishing (e.g. in {@link OpenAI})
     */
    generationInfo?: Record<string, any>;
};
/**
 * Contains all relevant information returned by an LLM.
 */
export type LLMResult = {
    /**
     * List of the things generated. Each input could have multiple {@link Generation | generations}, hence this is a list of lists.
     */
    generations: Generation[][];
    /**
     * Dictionary of arbitrary LLM-provider specific output.
     */
    llmOutput?: Record<string, any>;
};
