import { BaseChain, loadQAChain, } from "./index.js";
import { resolveConfigFromFile } from "../util/index.js";
export class VectorDBQAChain extends BaseChain {
    get inputKeys() {
        return [this.inputKey];
    }
    constructor(fields) {
        super();
        Object.defineProperty(this, "k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "result"
        });
        Object.defineProperty(this, "vectorstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.vectorstore = fields.vectorstore;
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.k = fields.k ?? this.k;
    }
    async _call(values) {
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        const docs = await this.vectorstore.similaritySearch(question, this.k);
        const inputs = { question, input_documents: docs };
        const result = await this.combineDocumentsChain.call(inputs);
        return result;
    }
    _chainType() {
        return "vector_db_qa";
    }
    static async deserialize(data, values) {
        if (!("vectorstore" in values)) {
            throw new Error(`Need to pass in a vectorstore to deserialize VectorDBQAChain`);
        }
        const { vectorstore } = values;
        const serializedCombineDocumentsChain = await resolveConfigFromFile("combine_documents_chain", data);
        return new VectorDBQAChain({
            combineDocumentsChain: await BaseChain.deserialize(serializedCombineDocumentsChain),
            k: data.k,
            vectorstore,
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            combine_documents_chain: this.combineDocumentsChain.serialize(),
            k: this.k,
        };
    }
    static fromLLM(llm, vectorstore) {
        const qaChain = loadQAChain(llm);
        const instance = new this({ vectorstore, combineDocumentsChain: qaChain });
        return instance;
    }
}
//# sourceMappingURL=vector_db_qa.js.map