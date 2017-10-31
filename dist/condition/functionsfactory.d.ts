export declare class FunctionFactory {
    static Instance: FunctionFactory;
    private functionHash;
    register(name: string, func: (params: any[]) => any): void;
    clear(): void;
    getAll(): Array<string>;
    run(name: string, params: any[]): any;
}
