import { SurveyTrigger } from './trigger';
export default class Model {
    questions: {};
    curPageIndex: number;
    isComplete: boolean;
    pages: import("mobx").IObservableArray<any>;
    triggers: Array<SurveyTrigger>;
    apis: any;
    isPreview: boolean;
    originalNumber: number;
    questionNamesInOrder: any[];
    constructor({ json, apis, isPreview }: {
        json: any;
        apis: any;
        isPreview?: boolean;
    });
    initStoreFromJson(json: any): void;
    nextPage(): void;
    prevPage(): void;
    resetVisible(): void;
    resetTitle(): void;
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
