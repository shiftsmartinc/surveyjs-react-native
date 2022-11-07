import { HashTable } from './helpers';
export declare class ProcessValue {
    values: HashTable<any>;
    properties: HashTable<any>;
    constructor();
    getFirstName(text: string): string;
    hasValue(text: string, values?: HashTable<any>): boolean;
    getValue(text: string, values?: HashTable<any>): any;
    getValueInfo(valueInfo: any): void;
    private getValueFromPath;
    private getValueCore;
    private getIntValue;
}
