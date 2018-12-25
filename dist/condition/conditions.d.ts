import { HashTable } from './base';
import { ProcessValue } from "./conditionProcessValue";
export declare class Operand {
    origionalValue: any;
    constructor(origionalValue: any);
    getValue(processValue: ProcessValue): any;
    operandToString(): any;
    private removeQuotes;
    private getValueName;
    private isBoolean;
    private isNumeric;
}
export declare class FunctionOperand extends Operand {
    origionalValue: any;
    parameters: Array<Operand>;
    constructor(origionalValue: any);
    getValue(processValue: ProcessValue): any;
    operandToString(): string;
}
export declare class Condition {
    static operatorsValue: HashTable<Function>;
    static readonly operators: HashTable<Function>;
    private opValue;
    private leftValue;
    private rightValue;
    left: Operand;
    right: Operand;
    operator: string;
    perform(left?: any, right?: any, processValue?: ProcessValue): boolean;
    performExplicit(left: any, right: any, processValue: ProcessValue): boolean;
}
export declare class ConditionNode {
    private connectiveValue;
    children: Array<any>;
    constructor();
    connective: string;
    readonly isEmpty: boolean;
    clear(): void;
}
export declare class ConditionRunner {
    private expressionValue;
    private processValue;
    private root;
    constructor(expression: string);
    expression: string;
    run(values: HashTable<any>): boolean;
    private runNode;
    private runNodeCondition;
    private runCondition;
}
