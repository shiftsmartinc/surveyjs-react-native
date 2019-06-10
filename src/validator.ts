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
      : match
      ;
  });
};

const getErrorStr = (templateName, errorArgs = [], errorText = null) => {
  return errorText || stringFormat(errorTemplates[templateName], ...errorArgs);
};

export default class QuestionValidator {
  owner;

  methodMap = {};

  private emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


  constructor(owner) {
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
    // invisible question will always pass validators
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
    if (this.owner.json.isRequired) {
      const requireValidator = {
        type: 'required',
      };
      if (this.owner.requiredErrorText) {
        requireValidator['text'] = this.owner.requiredErrorText;
      }
      return [requireValidator, ...originalValidators];
    }
    return originalValidators;
  }

  validateRequire = (value: any, validator: any) => {
    if (this.isValueEmpty(value)) {
      return getErrorStr('requiredError', [], validator.text);
    }
    return null;
  }

  public validateNumber = (value: any, validator: any) => {
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
  }

  public validateText = (value: any, validator: any) => {
    if (validator.minLength > 0 && value.length < validator.minLength) {
      return getErrorStr('textMinLength', [validator.minLength], validator.text);

    }
    if (validator.maxLength > 0 && value.length > validator.maxLength) {
      return getErrorStr('textMaxLength', [validator.maxLength], validator.text);
    }
    return null;
  }

  public validateAnswerCount = (value: any, validator: any) => {
    if (value == null || value.constructor != Array) return null;
    var count = value.length;
    if (validator.minCount && count < validator.minCount) {
      return getErrorStr('minSelectError', [validator.minCount], validator.text);
    }
    if (validator.maxCount && count > validator.maxCount) {
      return getErrorStr('maxSelectError', [validator.maxCount], validator.text);
    }
    return null;
  }

  public validateRegex = (value: any, validator: any): string => {
    if (!validator.regex || !value) return null;
    var re = new RegExp(validator.regex);
    if (re.test(value)) return null;
    return getErrorStr('', [], validator.text);
  }

  public validateEmail = (value: any, validator: any): string => {
    if (!value) return null;
    if (this.emailRegex.test(value)) return null;
    return getErrorStr('invalidEmail', [], validator.text);
  }

  isNumber = (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  isValueEmpty(value: any) {
    if (Array.isArray(value) && value.length === 0) return true;
    if (value && (typeof value === 'string' || value instanceof String)) {
      value = value.trim();
    }
    return !value && value !== 0 && value !== false;
  }

}
