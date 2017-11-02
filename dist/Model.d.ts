import { SurveyTrigger } from './trigger';
export interface IModel {
    isComplete: boolean;
    currentPageProps: any;
    setValue: any;
    nextPage: any;
    prevPage: any;
    nextPageIndex: any;
    prevPageIndex: any;
    onComplete(results: any): any;
}
export default class Model {
    questions: {};
    curPageIndex: number;
    isComplete: boolean;
    pages: any[];
    triggers: Array<SurveyTrigger>;
    apis: any;
    originalNumber: number;
    questionNamesInOrder: any[];
    constructor(json: any, apis: any);
    initStoreFromJson(json: any): void;
    nextPage(): void;
    prevPage(): void;
    resetVisible(): void;
    readonly prevPageIndex: any;
    readonly nextPageIndex: number;
    readonly currentPageProps: {
        name: any;
        questions: any;
    };
    readonly conditionValues: {};
    readonly results: {};
    onComplete: () => void;
    parseQuestion: (json: any, questionNames: any) => void;
    initPages: (pagesJson: any) => void;
    regenerateNumbers: () => void;
    initTriggers: (triggersJson?: any[]) => void;
    triggerGetObjects: (pageNames: any, questionNames: any) => any[];
    setTriggerValue(name: string, value: any, isVariable: boolean): void;
}
