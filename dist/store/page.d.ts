export default class Page {
    collection: any;
    name: any;
    _visible: any;
    json: any;
    questionNames: any;
    pageIndex: any;
    conditionRunner: any;
    constructor(json: any, collection: any, pageIndex: any, questionNames: any);
    setVisible(visible: any): void;
    resetVisible(): void;
    readonly visible: any;
}
