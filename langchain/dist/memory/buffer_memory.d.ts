import { BaseMemory, InputValues, MemoryVariables, OutputValues } from "./base.js";
export interface BufferMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
}
export declare class BufferMemory extends BaseMemory implements BufferMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    buffer: string;
    constructor(fields?: Partial<BufferMemoryInput>);
    loadMemoryVariables(_values: InputValues): Promise<MemoryVariables>;
    saveContext(inputValues: InputValues, outputValues: Promise<OutputValues>): Promise<void>;
}
