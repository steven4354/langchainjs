import type { Configuration as ConfigurationT, OpenAIApi as OpenAIApiT } from "openai";
import type fetchAdapterT from "../util/axios-fetch-adapter.js";
import { Embeddings } from "./base.js";
interface ModelParams {
    modelName: string;
}
export declare class OpenAIEmbeddings extends Embeddings implements ModelParams {
    modelName: string;
    batchSize: number;
    maxRetries: number;
    private apiKey;
    private client;
    constructor(fields?: Partial<ModelParams> & {
        verbose?: boolean;
        batchSize?: number;
        maxRetries?: number;
        openAIApiKey?: string;
    });
    embedDocuments(texts: string[]): Promise<number[][]>;
    embedQuery(text: string): Promise<number[]>;
    private embeddingWithRetry;
    static imports(): Promise<{
        Configuration: typeof ConfigurationT;
        OpenAIApi: typeof OpenAIApiT;
        fetchAdapter: typeof fetchAdapterT;
    }>;
}
export {};
