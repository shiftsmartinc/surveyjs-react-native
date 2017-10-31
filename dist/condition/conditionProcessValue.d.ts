import { HashTable } from './base';
export declare class ProcessValue {
    values: HashTable<any>;
    constructor();
    getFirstName(text: string): string;
    hasValue(text: string, values?: HashTable<any>): boolean;
    getValue(text: string, values?: HashTable<any>): any;
    private getValueCore(text, values);
    private getIntValue(str);
}
