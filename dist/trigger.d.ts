export interface HashTable<T> {
    [key: string]: T;
}
export declare class Trigger {
    static operatorsValue: HashTable<Function>;
    static get operators(): HashTable<Function>;
    private opValue;
    value: any;
    getType(): string;
    get operator(): string;
    set operator(value: string);
    check(value: any): void;
    protected onSuccess(): void;
    protected onFailure(): void;
}
export interface ISurveyTriggerOwner {
    getObjects(pages: string[], questions: string[]): any[];
    doComplete(): any;
    setTriggerValue(name: string, value: any, isVariable: boolean): any;
}
export declare class SurveyTrigger extends Trigger {
    name: string;
    protected owner: any;
    constructor(json: any);
    setOwner(owner: ISurveyTriggerOwner): void;
    get isOnNextPage(): boolean;
}
export declare class SurveyTriggerVisible extends SurveyTrigger {
    pages: string[];
    questions: string[];
    constructor(json: any);
    getType(): string;
    protected onSuccess(): void;
    protected onFailure(): void;
    private onTrigger;
    protected onItemSuccess(item: any): void;
    protected onItemFailure(item: any): void;
}
export declare class SurveyTriggerComplete extends SurveyTrigger {
    constructor(json: any);
    getType(): string;
    get isOnNextPage(): boolean;
    protected onSuccess(): void;
}
export declare class SurveyTriggerSetValue extends SurveyTrigger {
    setToName: string;
    setValue: any;
    isVariable: boolean;
    constructor(json: any);
    getType(): string;
    protected onSuccess(): void;
}
export declare const getTriggerType: (json: any) => typeof SurveyTrigger;
