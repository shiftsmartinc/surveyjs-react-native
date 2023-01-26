import { HashTable } from './helpers';
import { ProcessValue } from './conditionProcessValue';
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
    static get operators(): HashTable<Function>;
    private opValue;
    private leftValue;
    private rightValue;
    get left(): Operand;
    set left(val: Operand);
    get right(): Operand;
    set right(val: Operand);
    get operator(): string;
    set operator(value: string);
    perform(left?: any, right?: any, processValue?: ProcessValue): boolean;
    performExplicit(left: any, right: any, processValue: ProcessValue): boolean;
}
export declare class ConditionNode {
    private connectiveValue;
    children: Array<any>;
    constructor();
    get connective(): string;
    set connective(value: string);
    get isEmpty(): boolean;
    clear(): void;
}
export declare class ConditionRunner {
    private expressionValue;
    private processValue;
    private root;
    constructor(expression: string);
    get expression(): string;
    set expression(value: string);
    run(values: HashTable<any>): boolean;
    private runNode;
    private runNodeCondition;
    private runCondition;
}
