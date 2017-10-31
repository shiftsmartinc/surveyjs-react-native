export default class Question {
    visible: any;
    value: any;
    error: any;
    comment: any;
    number: any;
    questions: any[];
    originalNumber: any;
    json: any;
    collection: any;
    conditionRunner: any;
    page: any;
    constructor(json: any, originalNumber?: any, collection?: any);
    validate(): boolean;
    readonly plainValue: any;
    setValue(value: any, comment?: any): void;
    setComment(comment: any): void;
    setVisible(visible: any): void;
    resetVisible(): void;
    setError(error: any): void;
    setPage(page: any): void;
}
