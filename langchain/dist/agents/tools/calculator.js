import { Parser } from "expr-eval";
import { Tool } from "./base.js";
export class Calculator extends Tool {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "calculator"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Useful for getting the result of a math expression. 
  The input to this tool should be a valid mathmatical expression that can be parsed and evaluated by javascript's expr-eval`
        });
    }
    async call(input) {
        try {
            return Parser.evaluate(input).toString();
        }
        catch (error) {
            return "I don't know how to do that.";
        }
    }
}
//# sourceMappingURL=calculator.js.map