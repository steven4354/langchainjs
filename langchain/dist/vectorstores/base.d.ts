import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
export declare abstract class VectorStore {
    embeddings: Embeddings;
    constructor(embeddings: Embeddings);
    abstract addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    abstract similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document, number][]>;
    similaritySearch(query: string, k?: number): Promise<Document[]>;
    similaritySearchWithScore(query: string, k?: number): Promise<[object, number][]>;
}
export declare abstract class SaveableVectorStore extends VectorStore {
    abstract save(directory: string): Promise<void>;
    static load(_directory: string, _embeddings: Embeddings): Promise<SaveableVectorStore>;
}
