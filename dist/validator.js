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
};
const stringFormat = (str, ...args) => {
    return str.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
};
const getErrorStr = (templateName, errorArgs = [], errorText = null) => {
    return errorText || stringFormat(errorTemplates[templateName], ...errorArgs);
};
export default class QuestionValidator {
    constructor(owner) {
        this.methodMap = {};
        this.emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        this.validateRequire = (value, validator) => {
            if (this.isValueEmpty(value)) {
                return getErrorStr('requiredError', [], validator.text);
            }
            return null;
        };
        this.validateNumber = (value, validator) => {
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
        this.validateText = (value, validator) => {
            if (validator.minLength > 0 && value.length < validator.minLength) {
                return getErrorStr('textMinLength', [validator.minLength], validator.text);
            }
            if (validator.maxLength > 0 && value.length > validator.maxLength) {
                return getErrorStr('textMaxLength', [validator.maxLength], validator.text);
            }
            return null;
        };
        this.validateAnswerCount = (value, validator) => {
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
        this.validateRegex = (value, validator) => {
            if (!validator.regex || !value)
                return null;
            var re = new RegExp(validator.regex);
            if (re.test(value))
                return null;
            return getErrorStr('', [], validator.text);
        };
        this.validateEmail = (value, validator) => {
            if (!value)
                return null;
            if (this.emailRegex.test(value))
                return null;
            return getErrorStr('invalidEmail', [], validator.text);
        };
        this.isNumber = (value) => {
            return !isNaN(parseFloat(value)) && isFinite(value);
        };
        this.owner = owner;
        this.methodMap = {
            required: this.validateRequire,
            numeric: this.validateNumber,
            text: this.validateText,
            regex: this.validateRegex,
            answercount: this.validateAnswerCount,
            email: this.validateEmail,
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
            additionalValidators.push(lengthValidator);
        }
        return [...additionalValidators, ...originalValidators];
    }
    isValueEmpty(value) {
        if (Array.isArray(value) && value.length === 0)
            return true;
        if (value && (typeof value === 'string' || value instanceof String)) {
            value = value.trim();
        }
        return !value && value !== 0 && value !== false;
    }
}
