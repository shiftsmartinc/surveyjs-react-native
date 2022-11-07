import { HashTable } from "./helpers";
export declare class FunctionFactory {
    static Instance: FunctionFactory;
    private functionHash;
    private isAsyncHash;
    register(name: string, func: (params: any[]) => any): void;
    isAsyncFunction(name: string): boolean;
    clear(): void;
    getAll(): Array<string>;
    run(name: string, params: any[], properties?: HashTable<any>): any;
}
