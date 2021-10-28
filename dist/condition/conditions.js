import { ConditionsParser } from './conditionsParser';
import { FunctionFactory } from "./functionsfactory";
import { ProcessValue } from "./conditionProcessValue";
export class Operand {
    constructor(origionalValue) {
        this.origionalValue = origionalValue;
    }
    getValue(processValue) {
        var val = this.origionalValue;
        if (val === undefined || val === 'undefined')
            return null;
        if (!val || (typeof val != "string"))
            return val;
        if (this.isBoolean(val))
            return val.toLowerCase() == "true";
        val = this.removeQuotes(val);
        if (processValue) {
            var name = this.getValueName(val);
            if (name) {
                if (!processValue.hasValue(name))
                    return null;
                return processValue.getValue(name);
            }
        }
        return val;
    }
    operandToString() {
        var val = this.origionalValue;
        if (val && (!this.isNumeric(val) && !this.isBoolean(val)))
            val = "'" + val + "'";
        return val;
    }
    removeQuotes(val) {
        if (val.length > 0 && (val[0] == "'" || val[0] == '"'))
            val = val.substr(1);
        var len = val.length;
        if (len > 0 && (val[len - 1] == "'" || val[len - 1] == '"'))
            val = val.substr(0, len - 1);
        return val;
    }
    getValueName(val) {
        if (val.length < 3 || val[0] != '{' || val[val.length - 1] != '}')
            return null;
        return val.substr(1, val.length - 2);
    }
    isBoolean(value) {
        return value && (value.toLowerCase() === "true" || value.toLowerCase() === "false");
    }
    isNumeric(value) {
        var val = parseFloat(value);
        if (isNaN(val))
            return false;
        return isFinite(val);
    }
}
export class FunctionOperand extends Operand {
    constructor(origionalValue) {
        super(origionalValue);
        this.origionalValue = origionalValue;
        this.parameters = new Array();
    }
    getValue(processValue) {
        var paramValues = [];
        for (var i = 0; i < this.parameters.length; i++) {
            paramValues.push(this.parameters[i].getValue(processValue));
        }
        return FunctionFactory.Instance.run(this.origionalValue, paramValues);
    }
    operandToString() {
        var res = this.origionalValue + "(";
        for (var i = 0; i < this.parameters.length; i++) {
            if (i > 0)
                res += ", ";
            res += this.parameters[i].operandToString();
        }
        return res;
    }
}
export class Condition {
    constructor() {
        this.opValue = "equal";
        this.leftValue = null;
        this.rightValue = null;
    }
    static get operators() {
        if (Condition.operatorsValue != null)
            return Condition.operatorsValue;
        Condition.operatorsValue = {
            empty: function (left) {
                if (left == null)
                    return true;
                return !left;
            },
            notempty: function (left) {
                if (left == null)
                    return false;
                return !(!left);
            },
            equal: function (left, right) {
                if (left == null && right != null || left != null && right == null)
                    return false;
                if (left == null && right == null)
                    return true;
                return left == right;
            },
            notequal: function (left, right) {
                if (left == null && right != null || left != null && right == null)
                    return true;
                if (left == null && right == null)
                    return false;
                return left != right;
            },
            contains: function (left, right) { return (left != null) && left["indexOf"] && left.indexOf(right) > -1; },
            notcontains: function (left, right) { return (left == null) || !left["indexOf"] || left.indexOf(right) == -1; },
            greater: function (left, right) {
                if (left == null)
                    return false;
                if (right == null)
                    return true;
                return left > right;
            },
            less: function (left, right) {
                if (right == null)
                    return false;
                if (left == null)
                    return true;
                return left < right;
            },
            greaterorequal: function (left, right) {
                if (left == null && right != null)
                    return false;
                if (right == null)
                    return true;
                return left >= right;
            },
            lessorequal: function (left, right) {
                if (left != null && right == null)
                    return false;
                if (left == null)
                    return true;
                return left <= right;
            },
            anyof: function (left, right) {
                if (!left || !right) {
                    return false;
                }
                if (!Array.isArray(left.slice()) || !Array.isArray(right.slice())) {
                    return false;
                }
                const found = left.some(r => right.includes(r));
                return found;
            }
        };
        return Condition.operatorsValue;
    }
    get left() { return this.leftValue; }
    set left(val) { this.leftValue = val; }
    get right() { return this.rightValue; }
    set right(val) { this.rightValue = val; }
    get operator() { return this.opValue; }
    set operator(value) {
        if (!value)
            return;
        value = value.toLowerCase();
        if (!Condition.operators[value])
            return;
        this.opValue = value;
    }
    perform(left = null, right = null, processValue = null) {
        if (!left)
            left = this.left;
        if (!right)
            right = this.right;
        return this.performExplicit(left, right, processValue);
    }
    performExplicit(left, right, processValue) {
        var leftValue = left ? left.getValue(processValue) : null;
        if (!right && (leftValue === true || leftValue === false))
            return leftValue;
        var rightValue = right ? right.getValue(processValue) : null;
        return Condition.operators[this.operator](leftValue, rightValue);
    }
}
Condition.operatorsValue = null;
export class ConditionNode {
    constructor() {
        this.connectiveValue = "and";
        this.children = [];
    }
    get connective() { return this.connectiveValue; }
    set connective(value) {
        if (!value)
            return;
        value = value.toLowerCase();
        if (value == "&" || value == "&&")
            value = "and";
        if (value == "|" || value == "||")
            value = "or";
        if (value != "and" && value != "or")
            return;
        this.connectiveValue = value;
    }
    get isEmpty() { return this.children.length == 0; }
    clear() {
        this.children = [];
        this.connective = "and";
    }
}
export class ConditionRunner {
    constructor(expression) {
        this.root = new ConditionNode();
        this.expression = expression;
        this.processValue = new ProcessValue();
    }
    get expression() { return this.expressionValue; }
    set expression(value) {
        if (this.expression == value)
            return;
        this.expressionValue = value;
        new ConditionsParser().parse(this.expressionValue, this.root);
    }
    run(values) {
        this.processValue.values = values;
        return this.runNode(this.root);
    }
    runNode(node) {
        var onFirstFail = node.connective == "and";
        for (var i = 0; i < node.children.length; i++) {
            var res = this.runNodeCondition(node.children[i]);
            if (!res && onFirstFail)
                return false;
            if (res && !onFirstFail)
                return true;
        }
        return onFirstFail;
    }
    runNodeCondition(value) {
        if (value["children"])
            return this.runNode(value);
        if (value["left"])
            return this.runCondition(value);
        return false;
    }
    runCondition(condition) {
        return condition.performExplicit(condition.left, condition.right, this.processValue);
    }
}
