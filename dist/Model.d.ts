import { SurveyTrigger } from './trigger';
export default class Model {
    apis: any;
    curPageIndex: number;
    isComplete: boolean;
    isPreview: boolean;
    originalNumber: number;
    pages: any[];
    questionNamesInOrder: any[];
    questions: any;
    triggers: Array<SurveyTrigger>;
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
    get prevPageIndex(): any;
    get nextPageIndex(): number;
    get currentPageProps(): {
        name: any;
        questions: any;
    };
    get conditionValues(): {};
    get results(): {};
    onComplete: () => void;
    parseQuestion: (json: any, questionNames: any) => void;
    initPages: (pagesJson: any) => void;
    regenerateNumbers: () => void;
    initTriggers: (triggersJson?: any[]) => void;
    triggerGetObjects: (pageNames: any, questionNames: any) => any[];
    setTriggerValue(name: string, value: any, isVariable: boolean): void;
}
