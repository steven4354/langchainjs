import { BasePromptTemplate, } from "./index.js";
import { checkValidTemplate, renderTemplate, } from "./template.js";
import { resolveTemplateFromFile, resolveConfigFromFile, parseFileConfig, } from "../util/index.js";
import { PromptTemplate } from "./prompt.js";
import { BaseOutputParser } from "./parser.js";
/**
 * Prompt template that contains few-shot examples.
 * @augments BasePromptTemplate
 * @augments FewShotPromptTemplateInput
 */
export class FewShotPromptTemplate extends BasePromptTemplate {
    constructor(input) {
        super(input);
        Object.defineProperty(this, "examples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleSelector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "examplePrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "suffix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleSeparator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "templateFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "f-string"
        });
        Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.assign(this, input);
        if (this.examples !== undefined && this.exampleSelector !== undefined) {
            throw new Error("Only one of 'examples' and 'example_selector' should be provided");
        }
        if (this.examples === undefined && this.exampleSelector === undefined) {
            throw new Error("One of 'examples' and 'example_selector' should be provided");
        }
        if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
                totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            checkValidTemplate(this.prefix + this.suffix, this.templateFormat, totalInputVariables);
        }
    }
    _getPromptType() {
        return "few_shot";
    }
    getExamples(_) {
        if (this.examples !== undefined) {
            return this.examples;
        }
        if (this.exampleSelector !== undefined) {
            throw new Error("Example selectors are not yet supported.");
        }
        throw new Error("One of 'examples' and 'example_selector' should be provided");
    }
    async partial(values) {
        const promptDict = { ...this };
        promptDict.inputVariables = this.inputVariables.filter((iv) => !(iv in values));
        promptDict.partialVariables = {
            ...(this.partialVariables ?? {}),
            ...values,
        };
        return new FewShotPromptTemplate(promptDict);
    }
    async format(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        const examples = this.getExamples(allValues);
        const exampleStrings = examples.map((example) => this.examplePrompt.format(example));
        const template = [this.prefix, ...exampleStrings, this.suffix].join(this.exampleSeparator);
        return renderTemplate(template, this.templateFormat, allValues);
    }
    serialize() {
        if (this.exampleSelector || !this.examples) {
            throw new Error("Serializing an example selector is not currently supported");
        }
        return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            output_parser: this.outputParser?.serialize(),
            example_prompt: this.examplePrompt.serialize(),
            example_separator: this.exampleSeparator,
            suffix: this.suffix,
            prefix: this.prefix,
            template_format: this.templateFormat,
            examples: this.examples,
        };
    }
    static async deserialize(data) {
        const serializedPrompt = await resolveConfigFromFile("example_prompt", data);
        const examplePrompt = await PromptTemplate.deserialize(serializedPrompt);
        let examples;
        if (typeof data.examples === "string") {
            examples = await parseFileConfig(data.examples, ".json", [
                ".json",
                ".yml",
                ".yaml",
            ]);
        }
        else if (Array.isArray(data.examples)) {
            examples = data.examples;
        }
        else {
            throw new Error("Invalid examples format. Only list or string are supported.");
        }
        return new FewShotPromptTemplate({
            inputVariables: data.input_variables,
            outputParser: data.output_parser && BaseOutputParser.deserialize(data.output_parser),
            examplePrompt,
            examples,
            exampleSeparator: data.example_separator,
            prefix: await resolveTemplateFromFile("prefix", data),
            suffix: await resolveTemplateFromFile("suffix", data),
            templateFormat: data.template_format,
        });
    }
}
//# sourceMappingURL=few_shot.js.map