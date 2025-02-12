import { BasePromptTemplate, InputValues, BasePromptTemplateInput, PartialValues } from "./index.js";
import { TemplateFormat } from "./template.js";
import { PromptTemplate, SerializedPromptTemplate } from "./prompt.js";
import { SerializedOutputParser } from "./parser.js";
type ExampleSelector = null;
type Example = Record<string, any>;
export type SerializedFewShotTemplate = {
    _type: "few_shot";
    input_variables: string[];
    output_parser?: SerializedOutputParser;
    examples: string | Example[];
    example_prompt?: SerializedPromptTemplate;
    example_prompt_path?: string;
    example_separator: string;
    prefix?: string;
    prefix_path?: string;
    suffix?: string;
    suffix_path?: string;
    template_format: TemplateFormat;
};
export interface FewShotPromptTemplateInput extends BasePromptTemplateInput {
    /**
     * Examples to format into the prompt. Exactly one of this or
     * {@link exampleSelector} must be
     * provided.
     */
    examples?: Example[];
    /**
     * An {@link ExampleSelector} Examples to format into the prompt. Exactly one of this or
     * {@link examples} must be
     * provided.
     */
    exampleSelector?: ExampleSelector;
    /**
     * An {@link PromptTemplate} used to format a single example.
     */
    examplePrompt: PromptTemplate;
    /**
     * String separator used to join the prefix, the examples, and suffix.
     */
    exampleSeparator: string;
    /**
     * A prompt template string to put before the examples.
     *
     * @defaultValue `""`
     */
    prefix: string;
    /**
     * A prompt template string to put after the examples.
     */
    suffix: string;
    /**
     * The format of the prompt template. Options are: 'f-string', 'jinja-2'
     */
    templateFormat: TemplateFormat;
    /**
     * Whether or not to try validating the template on initialization.
     */
    validateTemplate?: boolean;
}
/**
 * Prompt template that contains few-shot examples.
 * @augments BasePromptTemplate
 * @augments FewShotPromptTemplateInput
 */
export declare class FewShotPromptTemplate extends BasePromptTemplate implements FewShotPromptTemplateInput {
    examples?: InputValues[];
    exampleSelector?: ExampleSelector;
    examplePrompt: PromptTemplate;
    suffix: string;
    exampleSeparator: string;
    prefix: string;
    templateFormat: TemplateFormat;
    validateTemplate: boolean;
    constructor(input: FewShotPromptTemplateInput);
    _getPromptType(): "few_shot";
    private getExamples;
    partial(values: PartialValues): Promise<FewShotPromptTemplate>;
    format(values: InputValues): Promise<string>;
    serialize(): SerializedFewShotTemplate;
    static deserialize(data: SerializedFewShotTemplate): Promise<FewShotPromptTemplate>;
}
export {};
