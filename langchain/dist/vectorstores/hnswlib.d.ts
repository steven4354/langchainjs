import type { HierarchicalNSW as HierarchicalNSWT, SpaceName } from "hnswlib-node";
import { Embeddings } from "../embeddings/base.js";
import { SaveableVectorStore } from "./base.js";
import { Document } from "../document.js";
import { InMemoryDocstore } from "../docstore/index.js";
export interface HNSWLibArgs {
    space: SpaceName;
    numDimensions?: number;
}
export declare class HNSWLib extends SaveableVectorStore {
    _index?: HierarchicalNSWT;
    docstore: InMemoryDocstore;
    args: HNSWLibArgs;
    constructor(args: HNSWLibArgs, embeddings: Embeddings, docstore: InMemoryDocstore, index?: HierarchicalNSWT);
    addDocuments(documents: Document[]): Promise<void>;
    private static getHierarchicalNSW;
    private initIndex;
    get index(): HierarchicalNSWT;
    private set index(value);
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document, number][]>;
    save(directory: string): Promise<void>;
    static load(directory: string, embeddings: Embeddings): Promise<HNSWLib>;
    static fromTexts(texts: string[], metadatas: object[], embeddings: Embeddings, docstore?: InMemoryDocstore): Promise<HNSWLib>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, docstore?: InMemoryDocstore): Promise<HNSWLib>;
    static imports(): Promise<{
        HierarchicalNSW: typeof HierarchicalNSWT;
    }>;
}
