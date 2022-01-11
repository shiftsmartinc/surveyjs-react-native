export interface HashTable<T> {
    [key: string]: T;
}
export declare class Helpers {
    static isValueEmpty(value: any): boolean;
    static isArrayContainsEqual(x: any, y: any): boolean;
    static isArraysEqual(x: any, y: any, ignoreOrder?: boolean): boolean;
    static isTwoValueEquals(x: any, y: any, ignoreOrder?: boolean): boolean;
    static randomizeArray<T>(array: Array<T>): Array<T>;
    static getUnbindValue(value: any): any;
    static createCopy(obj: any): any;
    static isConvertibleToNumber(value: any): boolean;
    static isNumber(value: any): boolean;
    static getMaxLength(maxLength: number, surveyLength: number): any;
    static getNumberByIndex(index: number, startIndexStr: string): string;
    static isCharNotLetterAndDigit(ch: string): boolean;
    static isCharDigit(ch: string): boolean;
    private static countDecimals;
    static correctAfterPlusMinis(a: number, b: number, res: number): number;
    static correctAfterMultiple(a: number, b: number, res: number): number;
}
