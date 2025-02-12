import { Document } from "../document.js";
import { BaseDocumentLoader } from "./base.js";
export class SRTLoader extends BaseDocumentLoader {
    constructor(filePath) {
        super();
        Object.defineProperty(this, "filePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: filePath
        });
        this.filePath = filePath;
    }
    async load() {
        const { readFile, SRTParser2 } = await SRTLoader.imports();
        const file = await readFile(this.filePath, "utf8");
        const parser = new SRTParser2();
        const srts = parser.fromSrt(file);
        const text = srts.map((srt) => srt.text).join(" ");
        const metadata = { source: this.filePath };
        return [new Document({ pageContent: text, metadata })];
    }
    static async imports() {
        let readFile = null;
        try {
            readFile = (await import("fs/promises")).readFile;
        }
        catch (e) {
            const { isBrowser, isNode, isWebWorker, isJsDom, isDeno,
            // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
             } = await import("browser-or-node");
            let env;
            if (isBrowser) {
                env = "browser";
            }
            else if (isNode) {
                env = "node";
            }
            else if (isWebWorker) {
                env = "webworker";
            }
            else if (isJsDom) {
                env = "jsdom";
            }
            else if (isDeno) {
                env = "deno";
            }
            else {
                env = "other";
            }
            throw new Error(`Failed to load fs/promises. SRTLoader available only on environment 'node'. It appears you are running environment '${env}'. See https://<link to docs> for alternatives.`);
        }
        let SRTParser2 = null;
        try {
            SRTParser2 = (await import("srt-parser-2")).default.default;
        }
        catch (e) {
            throw new Error("Please install srt-parser-2 as a dependency with, e.g. `yarn add srt-parser-2`");
        }
        return { readFile, SRTParser2 };
    }
}
//# sourceMappingURL=srt.js.map