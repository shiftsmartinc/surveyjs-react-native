export default class QuestionValidator {
    owner: any;
    methodMap: any;
    private emailRegex;
    constructor(owner: any);
    validate(): boolean;
    getValidators(): any[];
    validateRequire: (value: any, validator: any) => any;
    validateNumber: (value: any, validator: any) => any;
    validateText: (value: any, validator: any) => any;
    validateAnswerCount: (value: any, validator: any) => any;
    validateRegex: (value: any, validator: any) => string;
    validateEmail: (value: any, validator: any) => string;
    validateExpression: (_value: any, validator: any) => string;
    isNumber: (value: any) => boolean;
    isValueEmpty(value: any): boolean;
    runCondition(consumer: any, left: any, right: any): any;
}
