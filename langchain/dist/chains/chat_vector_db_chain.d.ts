import { BaseChain, ChainValues, SerializedBaseChain, SerializedLLMChain, LLMChain } from "./index.js";
import { VectorStore } from "../vectorstores/base.js";
import { BaseLLM } from "../llms/index.js";
export type LoadValues = Record<string, any>;
export interface ChatVectorDBQAChainInput {
    vectorstore: VectorStore;
    k: number;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    outputKey: string;
    inputKey: string;
}
export type SerializedChatVectorDBQAChain = {
    _type: "chat-vector-db";
    k: number;
    combine_documents_chain: SerializedBaseChain;
    combine_documents_chain_path?: string;
    question_generator: SerializedLLMChain;
};
export declare class ChatVectorDBQAChain extends BaseChain implements ChatVectorDBQAChainInput {
    k: number;
    inputKey: string;
    chatHistoryKey: string;
    get inputKeys(): string[];
    outputKey: string;
    vectorstore: VectorStore;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    constructor(fields: {
        vectorstore: VectorStore;
        combineDocumentsChain: BaseChain;
        questionGeneratorChain: LLMChain;
        inputKey?: string;
        outputKey?: string;
        k?: number;
    });
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): "chat-vector-db";
    static deserialize(data: SerializedChatVectorDBQAChain, values: LoadValues): Promise<ChatVectorDBQAChain>;
    serialize(): SerializedChatVectorDBQAChain;
    static fromLLM(llm: BaseLLM, vectorstore: VectorStore): ChatVectorDBQAChain;
}
