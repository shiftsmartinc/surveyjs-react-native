import { SyntaxError, parse } from './condition/expressions/expressionParser';
const errorTemplates = {
    requiredError: "Please answer the question.",
    numericError: "The value should be numeric.",
    numericMin: "Should be equal or more than {0}",
    numericMax: "Should be equal or less than {0}",
    invalidEmail: "Please enter a valid e-mail address.",
    textMinLength: "Please enter at least {0} symbols.",
    textMaxLength: "Please enter less than {0} symbols.",
    minSelectError: "Please select at least {0} variants.",
    maxSelectError: "Please select no more than {0} variants.",
    expressionError: "The expression: {0} {1} should return {1}.",
    syntaxError: "Syntax error in expression ({0})",
    unknownError: "An unknown error occurred ({0})",
};
const stringFormat = (str, ...args) => {
    return str.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
};
const formatStringWithResults = (str, results) => {
    const defaultValue = str;
    const matches = defaultValue.match(/{.+?}/g);
    let processedValue = defaultValue;
    if (matches) {
        matches.forEach((match) => {
            const valueName = match.replace('{', '').replace('}', '');
            const varValue = getResponseValue(results, valueName) || match;
            processedValue = processedValue.replace(match, varValue);
        });
    }
    return processedValue;
};
const getErrorStr = (templateName, errorArgs = [], errorText = null, results = {}) => {
    const errorMsg = errorText ? formatStringWithResults(errorText, results) : stringFormat(errorTemplates[templateName], ...errorArgs);
    return errorMsg;
};
const getResponseValue = (obj, desc) => {
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]))
        ;
    return obj;
};
const getValue = (value) => {
    var val = parseFloat(value);
    if (isNaN(val))
        return value;
    return val;
};
export default class QuestionValidator {
    owner;
    methodMap = {};
    emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    constructor(owner) {
        this.owner = owner;
        this.methodMap = {
            required: this.validateRequire,
            numeric: this.validateNumber,
            text: this.validateText,
            regex: this.validateRegex,
            answercount: this.validateAnswerCount,
            email: this.validateEmail,
            expression: this.validateExpression,
        };
    }
    validate() {
        if (!this.owner.visible) {
            return true;
        }
        const validators = this.getValidators();
        const hasError = validators.some(((validator) => {
            const validateMethod = this.methodMap[validator.type];
            if (!validateMethod) {
                return false;
            }
            const error = validateMethod(this.owner.plainValue, validator);
            this.owner.setError(error);
            return error;
        }));
        return !hasError;
    }
    getValidators() {
        const originalValidators = this.owner.json.validators || [];
        const additionalValidators = [];
        if (this.owner.json.isRequired) {
            const requireValidator = {
                type: 'required',
            };
            if (this.owner.requiredErrorText) {
                requireValidator['text'] = this.owner.requiredErrorText;
            }
            additionalValidators.push(requireValidator);
        }
        if (this.owner.value && (this.owner.json.maxLength || this.owner.json.minLength)) {
            const lengthValidator = {
                type: 'text',
                maxLength: this.owner.json.maxLength,
                minLength: this.owner.json.minLength,
            };
            if (this.owner.json.lengthValidationErrorText) {
                lengthValidator['text'] = this.owner.json.lengthValidationErrorText;
            }
            additionalValidators.push(lengthValidator);
        }
        return [...additionalValidators, ...originalValidators];
    }
    validateRequire = (value, validator) => {
        if (this.isValueEmpty(value)) {
            return getErrorStr('requiredError', [], validator.text);
        }
        return null;
    };
    validateNumber = (value, validator) => {
        if (!this.isNumber(value)) {
            return getErrorStr('numericError', [], validator.text);
        }
        const floatValue = parseFloat(value);
        if (validator.minValue !== null && validator.minValue > floatValue) {
            return getErrorStr('numericMin', [validator.minValue], validator.text);
        }
        if (validator.maxValue !== null && validator.maxValue < floatValue) {
            return getErrorStr('numericMax', [validator.maxValue], validator.text);
        }
        return (typeof floatValue === 'number') ? null : getErrorStr('numericError');
    };
    validateText = (value, validator) => {
        if (validator.minLength > 0 && value.length < validator.minLength) {
            return getErrorStr('textMinLength', [validator.minLength], validator.text);
        }
        if (validator.maxLength > 0 && value.length > validator.maxLength) {
            return getErrorStr('textMaxLength', [validator.maxLength], validator.text);
        }
        return null;
    };
    validateAnswerCount = (value, validator) => {
        if (value == null || value.constructor != Array)
            return null;
        var count = value.length;
        if (validator.minCount && count < validator.minCount) {
            return getErrorStr('minSelectError', [validator.minCount], validator.text);
        }
        if (validator.maxCount && count > validator.maxCount) {
            return getErrorStr('maxSelectError', [validator.maxCount], validator.text);
        }
        return null;
    };
    validateRegex = (value, validator) => {
        if (!validator.regex || !value)
            return null;
        var re = new RegExp(validator.regex);
        if (re.test(value))
            return null;
        return getErrorStr('', [], validator.text);
    };
    validateEmail = (value, validator) => {
        if (!value)
            return null;
        if (this.emailRegex.test(value))
            return null;
        return getErrorStr('invalidEmail', [], validator.text);
    };
    validateExpression = (_value, validator) => {
        if (!validator.expression)
            return null;
        try {
            const res = parse(validator.expression);
            const { consumer, left, right, operator } = res;
            const operationResult = this.runCondition(consumer, left, right);
            if (operationResult)
                return null;
            return getErrorStr('expressionError', [operator, right], validator.text, this.owner.collection.results || {});
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                return getErrorStr('syntaxError', [error.message]);
            }
            return getErrorStr('unknownError', [error.message]);
        }
    };
    isNumber = (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };
    isValueEmpty(value) {
        if (Array.isArray(value) && value.length === 0)
            return true;
        if (value && (typeof value === 'string' || value instanceof String)) {
            value = value.trim();
        }
        return !value && value !== 0 && value !== false;
    }
    runCondition(consumer, left, right) {
        let leftValue = left;
        let rightValue = right;
        if (left.consumer) {
            leftValue = this.runCondition(left.consumer, left.left, left.right);
        }
        if (right.consumer) {
            rightValue = this.runCondition(right.consumer, right.left, right.right);
        }
        let rightRawValue = rightValue.correctValue || rightValue;
        if (rightValue.variableName) {
            const rightQuestionName = rightValue.value.split('.').shift();
            const rightQuestion = this.owner.collection.questions[rightQuestionName];
            if (!rightQuestion) {
                return null;
            }
            rightRawValue = getResponseValue(this.owner.collection.results, rightValue.variableName);
        }
        let leftRawValue = leftValue.correctValue || leftValue;
        if (leftValue.value) {
            const leftQuestionName = leftValue.value.split('.').shift();
            const leftQuestion = this.owner.collection.questions[leftQuestionName];
            if (!leftQuestion)
                return null;
            if (leftValue.variableName) {
                leftRawValue = getResponseValue(this.owner.collection.results, leftValue.variableName);
            }
        }
        const operationResult = consumer(getValue(leftRawValue), getValue(rightRawValue));
        return operationResult;
    }
}
