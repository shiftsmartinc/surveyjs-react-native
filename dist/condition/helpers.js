;
export class Helpers {
    static isValueEmpty(value) {
        if (Array.isArray(value) && value.length === 0)
            return true;
        if (!!value && typeof value === "object" && value.constructor === Object) {
            for (var key in value) {
                if (!Helpers.isValueEmpty(value[key]))
                    return false;
            }
            return true;
        }
        return !value && value !== 0 && value !== false;
    }
    static isArrayContainsEqual(x, y) {
        if (!Array.isArray(x) || !Array.isArray(y))
            return false;
        if (x.length !== y.length)
            return false;
        for (var i = 0; i < x.length; i++) {
            var j = 0;
            for (; j < y.length; j++) {
                if (Helpers.isTwoValueEquals(x[i], y[j]))
                    break;
            }
            if (j === y.length)
                return false;
        }
        return true;
    }
    static isArraysEqual(x, y, ignoreOrder = false) {
        if (!Array.isArray(x) || !Array.isArray(y))
            return false;
        if (x.length !== y.length)
            return false;
        if (ignoreOrder) {
            var xSorted = [];
            var ySorted = [];
            for (var i = 0; i < x.length; i++) {
                xSorted.push(x[i]);
                ySorted.push(y[i]);
            }
            xSorted.sort();
            ySorted.sort();
            x = xSorted;
            y = ySorted;
        }
        for (var i = 0; i < x.length; i++) {
            if (!Helpers.isTwoValueEquals(x[i], y[i]))
                return false;
        }
        return true;
    }
    static isTwoValueEquals(x, y, ignoreOrder = false) {
        if (x === y)
            return true;
        if (Array.isArray(x) && x.length === 0 && typeof y === "undefined")
            return true;
        if (Array.isArray(y) && y.length === 0 && typeof x === "undefined")
            return true;
        if ((x === undefined || x === null) && y === "")
            return true;
        if ((y === undefined || y === null) && x === "")
            return true;
        if (typeof x === "string" && typeof y == "string")
            return x == y;
        if (Helpers.isConvertibleToNumber(x) && Helpers.isConvertibleToNumber(y)) {
            if (parseInt(x) === parseInt(y) && parseFloat(x) === parseFloat(y)) {
                return true;
            }
        }
        if ((!Helpers.isValueEmpty(x) && Helpers.isValueEmpty(y)) ||
            (Helpers.isValueEmpty(x) && !Helpers.isValueEmpty(y)))
            return false;
        if ((x === true || x === false) && typeof y == "string") {
            return x.toString() === y.toLocaleLowerCase();
        }
        if ((y === true || y === false) && typeof x == "string") {
            return y.toString() === x.toLocaleLowerCase();
        }
        if (!(x instanceof Object) && !(y instanceof Object))
            return x == y;
        if (!(x instanceof Object) || !(y instanceof Object))
            return false;
        if (x["equals"])
            return x.equals(y);
        if (!!x.toJSON && !!y.toJSON && !!x.getType && !!y.getType) {
            if (x.isDiposed || y.isDiposed)
                return false;
            if (x.getType() !== y.getType())
                return false;
            if (!!x.name && x.name !== y.name)
                return false;
            return this.isTwoValueEquals(x.toJSON(), y.toJSON());
        }
        if (Array.isArray(x) && Array.isArray(y))
            return Helpers.isArraysEqual(x, y, ignoreOrder);
        for (var p in x) {
            if (!x.hasOwnProperty(p))
                continue;
            if (!y.hasOwnProperty(p))
                return false;
            if (x[p] === y[p])
                continue;
            if (typeof x[p] !== "object")
                return false;
            if (!this.isTwoValueEquals(x[p], y[p]))
                return false;
        }
        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
                return false;
        }
        return true;
    }
    static randomizeArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    static getUnbindValue(value) {
        if (!!value && value instanceof Object) {
            return JSON.parse(JSON.stringify(value));
        }
        return value;
    }
    static createCopy(obj) {
        var res = {};
        if (!obj)
            return res;
        for (var key in obj) {
            res[key] = obj[key];
        }
        return res;
    }
    static isConvertibleToNumber(value) {
        return (value !== undefined &&
            value !== null &&
            !Array.isArray(value) &&
            !isNaN(value));
    }
    static isNumber(value) {
        if (typeof value == "string" &&
            !!value &&
            value.indexOf("0x") == 0 &&
            value.length > 32)
            return false;
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    static getMaxLength(maxLength, surveyLength) {
        if (maxLength < 0) {
            maxLength = surveyLength;
        }
        return maxLength > 0 ? maxLength : null;
    }
    static getNumberByIndex(index, startIndexStr) {
        if (index < 0)
            return "";
        var startIndex = 1;
        var prefix = "";
        var postfix = ".";
        var isNumeric = true;
        var strIndex = "A";
        var str = "";
        if (!!startIndexStr) {
            str = startIndexStr;
            var ind = str.length - 1;
            var hasDigit = false;
            for (var i = 0; i < str.length; i++) {
                if (Helpers.isCharDigit(str[i])) {
                    hasDigit = true;
                    break;
                }
            }
            var checkLetter = function () {
                return ((hasDigit && !Helpers.isCharDigit(str[ind])) ||
                    Helpers.isCharNotLetterAndDigit(str[ind]));
            };
            while (ind >= 0 && checkLetter())
                ind--;
            var newPostfix = "";
            if (ind < str.length - 1) {
                newPostfix = str.substr(ind + 1);
                str = str.substr(0, ind + 1);
            }
            ind = str.length - 1;
            while (ind >= 0) {
                if (checkLetter())
                    break;
                ind--;
                if (!hasDigit)
                    break;
            }
            strIndex = str.substr(ind + 1);
            prefix = str.substr(0, ind + 1);
            if (parseInt(strIndex))
                startIndex = parseInt(strIndex);
            else if (strIndex.length == 1)
                isNumeric = false;
            if (!!newPostfix || !!prefix) {
                postfix = newPostfix;
            }
        }
        if (isNumeric)
            return prefix + (index + startIndex).toString() + postfix;
        return (prefix + String.fromCharCode(strIndex.charCodeAt(0) + index) + postfix);
    }
    static isCharNotLetterAndDigit(ch) {
        return ch.toUpperCase() == ch.toLowerCase() && !Helpers.isCharDigit(ch);
    }
    static isCharDigit(ch) {
        return ch >= "0" && ch <= "9";
    }
}
if (!String.prototype["format"]) {
    String.prototype["format"] = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
        });
    };
}
