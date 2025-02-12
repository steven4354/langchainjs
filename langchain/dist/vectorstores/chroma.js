import { v4 as uuidv4 } from "uuid";
import { VectorStore } from "./base.js";
import { Document } from "../document.js";
let ChromaClient = null;
try {
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    ({ ChromaClient } = require("chromadb"));
}
catch {
    // ignore error
}
export class Chroma extends VectorStore {
    constructor(args, embeddings, index) {
        super(embeddings);
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "args", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "collectionName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.index = index;
        this.args = args;
        this.embeddings = embeddings;
        this.collectionName = ensureCollectionName(args.collectionName);
        this.url = args.url || "http://localhost:8000";
    }
    async addDocuments(documents) {
        const texts = documents.map(({ pageContent }) => pageContent);
        await this.addVectors(await this.embeddings.embedDocuments(texts), documents);
    }
    async addVectors(vectors, documents) {
        if (vectors.length === 0) {
            return;
        }
        if (!this.index) {
            if (this.args.numDimensions === undefined) {
                this.args.numDimensions = vectors[0].length;
            }
            if (ChromaClient === null) {
                throw new Error("Please install chromadb as a dependency with, e.g. `npm install -S chromadb`");
            }
            this.index = new ChromaClient(this.url);
            try {
                await this.index.createCollection(this.collectionName);
            }
            catch {
                // ignore error
            }
        }
        if (vectors.length !== documents.length) {
            throw new Error(`Vectors and metadatas must have the same length`);
        }
        if (vectors[0].length !== this.args.numDimensions) {
            throw new Error(`Vectors must have the same length as the number of dimensions (${this.args.numDimensions})`);
        }
        const collection = await this.index.getCollection(this.collectionName);
        const docstoreSize = await collection.count();
        await collection.add(Array.from({ length: vectors.length }, (_, i) => (docstoreSize + i).toString()), vectors, documents.map(({ metadata }) => metadata), documents.map(({ pageContent }) => pageContent));
    }
    async similaritySearchVectorWithScore(query, k) {
        if (!this.index) {
            throw new Error("Vector store not initialised yet. Try calling `addTexts` first.");
        }
        const collection = await this.index.getCollection(this.collectionName);
        // similaritySearchVectorWithScore supports one query vector at a time
        // chroma supports multiple query vectors at a time
        const result = await collection.query(query, k);
        const { ids, distances, documents, metadatas } = result;
        // get the result data from the first and only query vector
        const [firstIds] = ids;
        const [firstDistances] = distances;
        const [firstDocuments] = documents;
        const [firstMetadatas] = metadatas;
        const results = [];
        for (let i = 0; i < firstIds.length; i += 1) {
            results.push([
                new Document({
                    pageContent: firstDocuments[i],
                    metadata: firstMetadatas[i],
                }),
                firstDistances[i],
            ]);
        }
        return results;
    }
    static async fromTexts(texts, metadatas, embeddings, collectionName, url) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const newDoc = new Document({
                pageContent: texts[i],
                metadata: metadatas[i],
            });
            docs.push(newDoc);
        }
        return Chroma.fromDocuments(docs, embeddings, collectionName, url);
    }
    static async fromDocuments(docs, embeddings, collectionName, url) {
        if (ChromaClient === null) {
            throw new Error("Please install chromadb as a dependency with, e.g. `npm install -S chromadb`");
        }
        const args = {
            collectionName,
            url,
        };
        const instance = new this(args, embeddings);
        await instance.addDocuments(docs);
        return instance;
    }
}
function ensureCollectionName(collectionName) {
    if (!collectionName) {
        return `langchain-${uuidv4()}`;
    }
    return collectionName;
}
//# sourceMappingURL=chroma.js.map