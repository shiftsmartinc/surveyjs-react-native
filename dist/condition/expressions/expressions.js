import { Helpers } from "../helpers";
import { FunctionFactory } from "../functionsfactory";
import { ProcessValue } from "../conditionProcessValue";
export class Operand {
    toString(_func = undefined) {
        return "";
    }
    hasFunction() {
        return false;
    }
    hasAsyncFunction() {
        return false;
    }
    addToAsyncList(_list) { }
}
export class BinaryOperand extends Operand {
    constructor(operatorName, left = null, right = null, isArithmeticOp = false) {
        super();
        this.operatorName = operatorName;
        this.left = left;
        this.right = right;
        this.isArithmeticValue = isArithmeticOp;
        if (isArithmeticOp) {
            this.consumer = OperandMaker.binaryFunctions["arithmeticOp"](operatorName);
        }
        else {
            this.consumer = OperandMaker.binaryFunctions[operatorName];
        }
        if (this.consumer == null) {
            OperandMaker.throwInvalidOperatorError(operatorName);
        }
    }
    getType() {
        return "binary";
    }
    get isArithmetic() {
        return this.isArithmeticValue;
    }
    get isConjunction() {
        return this.operatorName == "or" || this.operatorName == "and";
    }
    get conjunction() {
        return this.isConjunction ? this.operatorName : "";
    }
    get operator() {
        return this.operatorName;
    }
    get leftOperand() {
        return this.left;
    }
    get rightOperand() {
        return this.right;
    }
    evaluateParam(x, processValue) {
        return x == null ? null : x.evaluate(processValue);
    }
    evaluate(processValue) {
        return this.consumer.call(this, this.evaluateParam(this.left, processValue), this.evaluateParam(this.right, processValue));
    }
    toString(func = undefined) {
        if (!!func) {
            var res = func(this);
            if (!!res)
                return res;
        }
        return ("(" +
            OperandMaker.safeToString(this.left, func) +
            " " +
            OperandMaker.operatorToString(this.operatorName) +
            " " +
            OperandMaker.safeToString(this.right, func) +
            ")");
    }
    setVariables(variables) {
        if (this.left != null)
            this.left.setVariables(variables);
        if (this.right != null)
            this.right.setVariables(variables);
    }
    hasFunction() {
        return ((!!this.left && this.left.hasFunction()) ||
            (!!this.right && this.right.hasFunction()));
    }
    hasAsyncFunction() {
        return ((!!this.left && this.left.hasAsyncFunction()) ||
            (!!this.right && this.right.hasAsyncFunction()));
    }
    addToAsyncList(list) {
        if (!!this.left)
            this.left.addToAsyncList(list);
        if (!!this.right)
            this.right.addToAsyncList(list);
    }
}
export class UnaryOperand extends Operand {
    constructor(expressionValue, operatorName) {
        super();
        this.expressionValue = expressionValue;
        this.operatorName = operatorName;
        this.consumer = OperandMaker.unaryFunctions[operatorName];
        if (this.consumer == null) {
            OperandMaker.throwInvalidOperatorError(operatorName);
        }
    }
    get operator() {
        return this.operatorName;
    }
    get expression() {
        return this.expressionValue;
    }
    getType() {
        return "unary";
    }
    toString(func = undefined) {
        if (!!func) {
            var res = func(this);
            if (!!res)
                return res;
        }
        return (OperandMaker.operatorToString(this.operatorName) +
            " " +
            this.expression.toString(func));
    }
    evaluate(processValue) {
        let value = this.expression.evaluate(processValue);
        return this.consumer.call(this, value);
    }
    setVariables(variables) {
        this.expression.setVariables(variables);
    }
}
export class ArrayOperand extends Operand {
    constructor(values) {
        super();
        this.values = values;
    }
    getType() {
        return "array";
    }
    toString(func = undefined) {
        if (!!func) {
            var res = func(this);
            if (!!res)
                return res;
        }
        return ("[" +
            this.values
                .map(function (el) {
                return el.toString(func);
            })
                .join(", ") +
            "]");
    }
    evaluate(processValue) {
        return this.values.map(function (el) {
            return el.evaluate(processValue);
        });
    }
    setVariables(variables) {
        this.values.forEach((el) => {
            el.setVariables(variables);
        });
    }
    hasFunction() {
        return this.values.some((operand) => operand.hasFunction());
    }
    hasAsyncFunction() {
        return this.values.some((operand) => operand.hasAsyncFunction());
    }
    addToAsyncList(list) {
        this.values.forEach((operand) => operand.addToAsyncList(list));
    }
}
export class Const extends Operand {
    constructor(value) {
        super();
        this.value = value;
    }
    getType() {
        return "const";
    }
    toString(func = undefined) {
        if (!!func) {
            var res = func(this);
            if (!!res)
                return res;
        }
        return this.value.toString();
    }
    get correctValue() {
        return this.getCorrectValue(this.value);
    }
    evaluate() {
        return this.getCorrectValue(this.value);
    }
    setVariables(_variables) { }
    getCorrectValue(value) {
        if (!value || typeof value != "string")
            return value;
        if (this.isBooleanValue(value))
            return value.toLowerCase() === "true";
        if (value.length > 1 &&
            this.isQuote(value[0]) &&
            this.isQuote(value[value.length - 1]))
            return value.substr(1, value.length - 2);
        if (OperandMaker.isNumeric(value)) {
            if (value.indexOf("0x") == 0)
                return parseInt(value);
            if (value.length > 1 && value[0] == "0")
                return value;
            return parseFloat(value);
        }
        return value;
    }
    isQuote(ch) {
        return ch == "'" || ch == '"';
    }
    isBooleanValue(value) {
        return (value &&
            (value.toLowerCase() === "true" || value.toLowerCase() === "false"));
    }
}
export class Variable extends Const {
    constructor(variableName) {
        super(variableName);
        this.variableName = variableName;
        this.valueInfo = {};
        this.useValueAsItIs = false;
        if (!!this.variableName &&
            this.variableName.length > 1 &&
            this.variableName[0] === Variable.DisableConversionChar) {
            this.variableName = this.variableName.substr(1);
            this.useValueAsItIs = true;
        }
    }
    getType() {
        return "variable";
    }
    toString(func = undefined) {
        if (!!func) {
            var res = func(this);
            if (!!res)
                return res;
        }
        var prefix = this.useValueAsItIs ? Variable.DisableConversionChar : "";
        return "{" + prefix + this.variableName + "}";
    }
    get variable() {
        return this.variableName;
    }
    evaluate(processValue) {
        this.valueInfo.name = this.variableName;
        processValue.getValueInfo(this.valueInfo);
        return this.valueInfo.hasValue
            ? this.getCorrectValue(this.valueInfo.value)
            : null;
    }
    setVariables(variables) {
        variables.push(this.variableName);
    }
    getCorrectValue(value) {
        if (this.useValueAsItIs)
            return value;
        return super.getCorrectValue(value);
    }
}
Variable.DisableConversionChar = "#";
export class FunctionOperand extends Operand {
    constructor(originalValue, parameters) {
        super();
        this.originalValue = originalValue;
        this.parameters = parameters;
        this.isReadyValue = false;
        if (Array.isArray(parameters) && parameters.length === 0) {
            this.parameters = new ArrayOperand([]);
        }
    }
    getType() {
        return "function";
    }
    evaluateAsync(processValue) {
        this.isReadyValue = false;
        var asyncProcessValue = new ProcessValue();
        asyncProcessValue.values = Helpers.createCopy(processValue.values);
        asyncProcessValue.properties = Helpers.createCopy(processValue.properties);
        asyncProcessValue.properties.returnResult = (result) => {
            this.asynResult = result;
            this.isReadyValue = true;
            this.onAsyncReady();
        };
        this.evaluateCore(asyncProcessValue);
    }
    evaluate(processValue) {
        if (this.isReady)
            return this.asynResult;
        return this.evaluateCore(processValue);
    }
    evaluateCore(processValue) {
        return FunctionFactory.Instance.run(this.originalValue, this.parameters.evaluate(processValue), processValue.properties);
    }
    toString(func = undefined) {
        if (!!func) {
            var res = func(this);
            if (!!res)
                return res;
        }
        return this.originalValue + "(" + this.parameters.toString(func) + ")";
    }
    setVariables(variables) {
        this.parameters.setVariables(variables);
    }
    get isReady() {
        return this.isReadyValue;
    }
    hasFunction() {
        return true;
    }
    hasAsyncFunction() {
        return FunctionFactory.Instance.isAsyncFunction(this.originalValue);
    }
    addToAsyncList(list) {
        if (this.hasAsyncFunction()) {
            list.push(this);
        }
    }
}
export class OperandMaker {
    static throwInvalidOperatorError(op) {
        throw new Error("Invalid operator: '" + op + "'");
    }
    static safeToString(operand, func) {
        return operand == null ? "" : operand.toString(func);
    }
    static toOperandString(value) {
        if (!!value &&
            !OperandMaker.isNumeric(value) &&
            !OperandMaker.isBooleanValue(value))
            value = "'" + value + "'";
        return value;
    }
    static isSpaceString(str) {
        return !!str && !str.replace(" ", "");
    }
    static isNumeric(value) {
        if (!!value &&
            (value.indexOf("-") > -1 ||
                value.indexOf("+") > 1 ||
                value.indexOf("*") > -1 ||
                value.indexOf("^") > -1 ||
                value.indexOf("/") > -1 ||
                value.indexOf("%") > -1))
            return false;
        if (OperandMaker.isSpaceString(value))
            return false;
        return Helpers.isNumber(value);
    }
    static isBooleanValue(value) {
        return (!!value &&
            (value.toLowerCase() === "true" || value.toLowerCase() === "false"));
    }
    static isTwoValueEquals(x, y) {
        if (x === "undefined")
            x = undefined;
        if (y === "undefined")
            y = undefined;
        return Helpers.isTwoValueEquals(x, y, true);
    }
    static operatorToString(operatorName) {
        let opStr = OperandMaker.signs[operatorName];
        return opStr == null ? operatorName : opStr;
    }
}
OperandMaker.unaryFunctions = {
    empty: function (value) {
        return Helpers.isValueEmpty(value);
    },
    notempty: function (value) {
        return !OperandMaker.unaryFunctions.empty(value);
    },
    negate: function (value) {
        return !value;
    },
};
OperandMaker.binaryFunctions = {
    arithmeticOp(operatorName) {
        return function (a, b) {
            if (Helpers.isValueEmpty(a) && !OperandMaker.isSpaceString(a)) {
                a = typeof b === "string" ? "" : 0;
            }
            if (Helpers.isValueEmpty(b) && !OperandMaker.isSpaceString(b)) {
                b = typeof a === "string" ? "" : 0;
            }
            let consumer = OperandMaker.binaryFunctions[operatorName];
            return consumer == null ? null : consumer.call(this, a, b);
        };
    },
    and: function (a, b) {
        return a && b;
    },
    or: function (a, b) {
        return a || b;
    },
    plus: function (a, b) {
        return a + b;
    },
    minus: function (a, b) {
        return a - b;
    },
    mul: function (a, b) {
        return a * b;
    },
    div: function (a, b) {
        if (!b)
            return null;
        return a / b;
    },
    mod: function (a, b) {
        if (!b)
            return null;
        return a % b;
    },
    power: function (a, b) {
        return Math.pow(a, b);
    },
    greater: function (left, right) {
        if (left == null || right == null)
            return false;
        return left > right;
    },
    less: function (left, right) {
        if (left == null || right == null)
            return false;
        return left < right;
    },
    greaterorequal: function (left, right) {
        if (OperandMaker.binaryFunctions.equal(left, right))
            return true;
        return OperandMaker.binaryFunctions.greater(left, right);
    },
    lessorequal: function (left, right) {
        if (OperandMaker.binaryFunctions.equal(left, right))
            return true;
        return OperandMaker.binaryFunctions.less(left, right);
    },
    equal: function (left, right) {
        return OperandMaker.isTwoValueEquals(left, right);
    },
    notequal: function (left, right) {
        return !OperandMaker.binaryFunctions.equal(left, right);
    },
    contains: function (left, right) {
        return OperandMaker.binaryFunctions.containsCore(left, right, true);
    },
    notcontains: function (left, right) {
        if (!left && !Helpers.isValueEmpty(right))
            return true;
        return OperandMaker.binaryFunctions.containsCore(left, right, false);
    },
    anyof: function (left, right) {
        if (Helpers.isValueEmpty(left) && Helpers.isValueEmpty(right))
            return true;
        if (Helpers.isValueEmpty(left) ||
            (!Array.isArray(left) && left.length === 0))
            return false;
        if (Helpers.isValueEmpty(right))
            return true;
        if (!Array.isArray(left))
            return OperandMaker.binaryFunctions.contains(right, left);
        if (!Array.isArray(right))
            return OperandMaker.binaryFunctions.contains(left, right);
        for (var i = 0; i < right.length; i++) {
            if (OperandMaker.binaryFunctions.contains(left, right[i]))
                return true;
        }
        return false;
    },
    allof: function (left, right) {
        if (!left && !Helpers.isValueEmpty(right))
            return false;
        if (!Array.isArray(right))
            return OperandMaker.binaryFunctions.contains(left, right);
        for (var i = 0; i < right.length; i++) {
            if (!OperandMaker.binaryFunctions.contains(left, right[i]))
                return false;
        }
        return true;
    },
    containsCore: function (left, right, isContains) {
        if (!left && left !== 0 && left !== false)
            return false;
        if (!left.length) {
            left = left.toString();
            if (typeof right === "string" || right instanceof String) {
                left = left.toUpperCase();
                right = right.toUpperCase();
            }
        }
        if (typeof left === "string" || left instanceof String) {
            if (!right)
                return false;
            right = right.toString();
            var found = left.indexOf(right) > -1;
            return isContains ? found : !found;
        }
        var rightArray = Array.isArray(right) ? right : [right];
        for (var rIndex = 0; rIndex < rightArray.length; rIndex++) {
            var i = 0;
            right = rightArray[rIndex];
            for (; i < left.length; i++) {
                if (OperandMaker.isTwoValueEquals(left[i], right))
                    break;
            }
            if (i == left.length)
                return !isContains;
        }
        return isContains;
    },
};
OperandMaker.signs = {
    less: "<",
    lessorequal: "<=",
    greater: ">",
    greaterorequal: ">=",
    equal: "==",
    notequal: "!=",
    plus: "+",
    minus: "-",
    mul: "*",
    div: "/",
    and: "and",
    or: "or",
    power: "^",
    mod: "%",
    negate: "!",
};
