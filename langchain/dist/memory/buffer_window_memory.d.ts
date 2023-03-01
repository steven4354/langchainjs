import { BaseMemory, InputValues, MemoryVariables, OutputValues } from "./base.js";
export interface BufferWindowMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    k: number;
}
export declare class BufferWindowMemory extends BaseMemory implements BufferWindowMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    buffer: string[];
    k: number;
    constructor(fields?: Partial<BufferWindowMemoryInput>);
    loadMemoryVariables(_values: InputValues): Promise<MemoryVariables>;
    saveContext(inputValues: InputValues, outputValues: Promise<OutputValues>): Promise<void>;
}
