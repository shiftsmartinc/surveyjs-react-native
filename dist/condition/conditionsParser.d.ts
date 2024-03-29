import { ConditionNode } from './conditions';
export declare class ConditionsParser {
    private static constants;
    private text;
    private root;
    private expressionNodes;
    private node;
    private at;
    private length;
    parse(text: string, root: ConditionNode): boolean;
    toString(root: ConditionNode): string;
    private toStringCore;
    private nodeToString;
    private conditionToString;
    private operationToString;
    private parseText;
    private readConditions;
    private readCondition;
    private readExpression;
    private get ch();
    private skip;
    private isSpace;
    private isQuotes;
    private isComma;
    private isOperatorChar;
    private isOpenBracket;
    private isCloseBracket;
    private isBrackets;
    private isOpenSquareBracket;
    private isCloseSquareBracket;
    private isSquareBrackets;
    private readString;
    private createOperand;
    private readParameters;
    private isNoRightOperation;
    private isConstant;
    private readOperator;
    private readConnective;
    private pushExpression;
    private popExpression;
    private addCondition;
    private addConnective;
}
