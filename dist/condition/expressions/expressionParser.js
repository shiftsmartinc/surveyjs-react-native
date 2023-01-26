import { Const, BinaryOperand, Variable, UnaryOperand, FunctionOperand, ArrayOperand } from "./expressions";
"use strict";
export class SyntaxError extends Error {
    static buildMessage(expected, found) {
        function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/"/g, "\\\"")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
        }
        function classEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/\]/g, "\\]")
                .replace(/\^/g, "\\^")
                .replace(/-/g, "\\-")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
        }
        function describeExpectation(expectation) {
            switch (expectation.type) {
                case "literal":
                    return "\"" + literalEscape(expectation.text) + "\"";
                case "class":
                    const escapedParts = expectation.parts.map((part) => {
                        return Array.isArray(part)
                            ? classEscape(part[0]) + "-" + classEscape(part[1])
                            : classEscape(part);
                    });
                    return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                case "any":
                    return "any character";
                case "end":
                    return "end of input";
                case "other":
                    return expectation.description;
            }
        }
        function describeExpected(expected1) {
            const descriptions = expected1.map(describeExpectation);
            let i;
            let j;
            descriptions.sort();
            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                    if (descriptions[i - 1] !== descriptions[i]) {
                        descriptions[j] = descriptions[i];
                        j++;
                    }
                }
                descriptions.length = j;
            }
            switch (descriptions.length) {
                case 1:
                    return descriptions[0];
                case 2:
                    return descriptions[0] + " or " + descriptions[1];
                default:
                    return descriptions.slice(0, -1).join(", ")
                        + ", or "
                        + descriptions[descriptions.length - 1];
            }
        }
        function describeFound(found1) {
            return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    }
    message;
    expected;
    found;
    location;
    name;
    constructor(message, expected, found, location) {
        super();
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, SyntaxError);
        }
    }
}
function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    const peg$FAILED = {};
    const peg$startRuleFunctions = { Expression: peg$parseExpression };
    let peg$startRuleFunction = peg$parseExpression;
    const peg$c0 = function (head, tail) {
        return buildBinaryOperand(head, tail, true);
    };
    const peg$c1 = "||";
    const peg$c2 = peg$literalExpectation("||", false);
    const peg$c3 = "or";
    const peg$c4 = peg$literalExpectation("or", true);
    const peg$c5 = function () { return "or"; };
    const peg$c6 = "&&";
    const peg$c7 = peg$literalExpectation("&&", false);
    const peg$c8 = "and";
    const peg$c9 = peg$literalExpectation("and", true);
    const peg$c10 = function () { return "and"; };
    const peg$c11 = function (head, tail) {
        return buildBinaryOperand(head, tail);
    };
    const peg$c12 = "<=";
    const peg$c13 = peg$literalExpectation("<=", false);
    const peg$c14 = "lessorequal";
    const peg$c15 = peg$literalExpectation("lessorequal", true);
    const peg$c16 = function () { return "lessorequal"; };
    const peg$c17 = ">=";
    const peg$c18 = peg$literalExpectation(">=", false);
    const peg$c19 = "greaterorequal";
    const peg$c20 = peg$literalExpectation("greaterorequal", true);
    const peg$c21 = function () { return "greaterorequal"; };
    const peg$c22 = "=";
    const peg$c23 = peg$literalExpectation("=", false);
    const peg$c24 = "equal";
    const peg$c25 = peg$literalExpectation("equal", true);
    const peg$c26 = function () { return "equal"; };
    const peg$c27 = "!=";
    const peg$c28 = peg$literalExpectation("!=", false);
    const peg$c29 = "notequal";
    const peg$c30 = peg$literalExpectation("notequal", true);
    const peg$c31 = function () { return "notequal"; };
    const peg$c32 = "<";
    const peg$c33 = peg$literalExpectation("<", false);
    const peg$c34 = "less";
    const peg$c35 = peg$literalExpectation("less", true);
    const peg$c36 = function () { return "less"; };
    const peg$c37 = ">";
    const peg$c38 = peg$literalExpectation(">", false);
    const peg$c39 = "greater";
    const peg$c40 = peg$literalExpectation("greater", true);
    const peg$c41 = function () { return "greater"; };
    const peg$c42 = "+";
    const peg$c43 = peg$literalExpectation("+", false);
    const peg$c44 = function () { return "plus"; };
    const peg$c45 = "-";
    const peg$c46 = peg$literalExpectation("-", false);
    const peg$c47 = function () { return "minus"; };
    const peg$c48 = "*";
    const peg$c49 = peg$literalExpectation("*", false);
    const peg$c50 = function () { return "mul"; };
    const peg$c51 = "/";
    const peg$c52 = peg$literalExpectation("/", false);
    const peg$c53 = function () { return "div"; };
    const peg$c54 = "%";
    const peg$c55 = peg$literalExpectation("%", false);
    const peg$c56 = function () { return "mod"; };
    const peg$c57 = "^";
    const peg$c58 = peg$literalExpectation("^", false);
    const peg$c59 = "power";
    const peg$c60 = peg$literalExpectation("power", true);
    const peg$c61 = function () { return "power"; };
    const peg$c62 = "*=";
    const peg$c63 = peg$literalExpectation("*=", false);
    const peg$c64 = "contains";
    const peg$c65 = peg$literalExpectation("contains", true);
    const peg$c66 = "contain";
    const peg$c67 = peg$literalExpectation("contain", true);
    const peg$c68 = function () { return "contains"; };
    const peg$c69 = "notcontains";
    const peg$c70 = peg$literalExpectation("notcontains", true);
    const peg$c71 = "notcontain";
    const peg$c72 = peg$literalExpectation("notcontain", true);
    const peg$c73 = function () { return "notcontains"; };
    const peg$c74 = "anyof";
    const peg$c75 = peg$literalExpectation("anyof", true);
    const peg$c76 = function () { return "anyof"; };
    const peg$c77 = "allof";
    const peg$c78 = peg$literalExpectation("allof", true);
    const peg$c79 = function () { return "allof"; };
    const peg$c80 = "(";
    const peg$c81 = peg$literalExpectation("(", false);
    const peg$c82 = ")";
    const peg$c83 = peg$literalExpectation(")", false);
    const peg$c84 = function (expr) { return expr; };
    const peg$c85 = function (name, params) { return new FunctionOperand(name, params); };
    const peg$c86 = "!";
    const peg$c87 = peg$literalExpectation("!", false);
    const peg$c88 = "negate";
    const peg$c89 = peg$literalExpectation("negate", true);
    const peg$c90 = function (expr) { return new UnaryOperand(expr, "negate"); };
    const peg$c91 = function (expr, op) { return new UnaryOperand(expr, op); };
    const peg$c92 = "empty";
    const peg$c93 = peg$literalExpectation("empty", true);
    const peg$c94 = function () { return "empty"; };
    const peg$c95 = "notempty";
    const peg$c96 = peg$literalExpectation("notempty", true);
    const peg$c97 = function () { return "notempty"; };
    const peg$c98 = "undefined";
    const peg$c99 = peg$literalExpectation("undefined", false);
    const peg$c100 = "null";
    const peg$c101 = peg$literalExpectation("null", false);
    const peg$c102 = function () { return null; };
    const peg$c103 = function (value) { return new Const(value); };
    const peg$c104 = "{";
    const peg$c105 = peg$literalExpectation("{", false);
    const peg$c106 = "}";
    const peg$c107 = peg$literalExpectation("}", false);
    const peg$c108 = function (value) { return new Variable(value); };
    const peg$c109 = function (value) { return value; };
    const peg$c110 = "''";
    const peg$c111 = peg$literalExpectation("''", false);
    const peg$c112 = function () { return ""; };
    const peg$c113 = "\"\"";
    const peg$c114 = peg$literalExpectation("\"\"", false);
    const peg$c115 = "'";
    const peg$c116 = peg$literalExpectation("'", false);
    const peg$c117 = function (value) { return "'" + value + "'"; };
    const peg$c118 = "\"";
    const peg$c119 = peg$literalExpectation("\"", false);
    const peg$c120 = "[";
    const peg$c121 = peg$literalExpectation("[", false);
    const peg$c122 = "]";
    const peg$c123 = peg$literalExpectation("]", false);
    const peg$c124 = function (sequence) { return sequence; };
    const peg$c125 = ",";
    const peg$c126 = peg$literalExpectation(",", false);
    const peg$c127 = function (expr, tail) {
        if (expr == null)
            return new ArrayOperand([]);
        var array = [expr];
        if (Array.isArray(tail)) {
            var flatten = flattenArray(tail);
            for (var i = 3; i < flatten.length; i += 4) {
                array.push(flatten[i]);
            }
        }
        return new ArrayOperand(array);
    };
    const peg$c128 = "true";
    const peg$c129 = peg$literalExpectation("true", true);
    const peg$c130 = function () { return true; };
    const peg$c131 = "false";
    const peg$c132 = peg$literalExpectation("false", true);
    const peg$c133 = function () { return false; };
    const peg$c134 = "0x";
    const peg$c135 = peg$literalExpectation("0x", false);
    const peg$c136 = function () { return parseInt(text(), 16); };
    const peg$c137 = /^[\-]/;
    const peg$c138 = peg$classExpectation(["-"], false, false);
    const peg$c139 = function (sign, num) { return sign == null ? num : -num; };
    const peg$c140 = ".";
    const peg$c141 = peg$literalExpectation(".", false);
    const peg$c142 = function () { return parseFloat(text()); };
    const peg$c143 = function () { return parseInt(text(), 10); };
    const peg$c144 = "0";
    const peg$c145 = peg$literalExpectation("0", false);
    const peg$c146 = function () { return 0; };
    const peg$c147 = function (chars) { return chars.join(""); };
    const peg$c148 = "\\'";
    const peg$c149 = peg$literalExpectation("\\'", false);
    const peg$c150 = function () { return "'"; };
    const peg$c151 = "\\\"";
    const peg$c152 = peg$literalExpectation("\\\"", false);
    const peg$c153 = function () { return "\""; };
    const peg$c154 = /^[^"']/;
    const peg$c155 = peg$classExpectation(["\"", "'"], true, false);
    const peg$c156 = function () { return text(); };
    const peg$c157 = /^[^{}]/;
    const peg$c158 = peg$classExpectation(["{", "}"], true, false);
    const peg$c159 = /^[0-9]/;
    const peg$c160 = peg$classExpectation([["0", "9"]], false, false);
    const peg$c161 = /^[1-9]/;
    const peg$c162 = peg$classExpectation([["1", "9"]], false, false);
    const peg$c163 = /^[a-zA-Z]/;
    const peg$c164 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
    const peg$c165 = peg$otherExpectation("whitespace");
    const peg$c166 = /^[ \t\n\r]/;
    const peg$c167 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false);
    let peg$currPos = 0;
    let peg$savedPos = 0;
    const peg$posDetailsCache = [{ line: 1, column: 1 }];
    let peg$maxFailPos = 0;
    let peg$maxFailExpected = [];
    let peg$silentFails = 0;
    const peg$resultsCache = {};
    let peg$result;
    if (options.startRule !== undefined) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
    }
    function error(message, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location1);
    }
    function peg$literalExpectation(text1, ignoreCase) {
        return { type: "literal", text: text1, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        let details = peg$posDetailsCache[pos];
        let p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        const startPosDetails = peg$computePosDetails(startPos);
        const endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected1) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected1);
    }
    function peg$buildSimpleError(message, location1) {
        return new SyntaxError(message, [], "", location1);
    }
    function peg$buildStructuredError(expected1, found, location1) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }
    function peg$parseExpression() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8;
        const key = peg$currPos * 34 + 0;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseLogicOr();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$currPos;
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parseOrSign();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parse_();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parseLogicOr();
                            if (s8 !== peg$FAILED) {
                                s5 = [s5, s6, s7, s8];
                                s4 = s5;
                            }
                            else {
                                peg$currPos = s4;
                                s4 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$currPos;
                    s5 = peg$parse_();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseOrSign();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parse_();
                            if (s7 !== peg$FAILED) {
                                s8 = peg$parseLogicOr();
                                if (s8 !== peg$FAILED) {
                                    s5 = [s5, s6, s7, s8];
                                    s4 = s5;
                                }
                                else {
                                    peg$currPos = s4;
                                    s4 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s4;
                                s4 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c0(s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseOrSign() {
        let s0, s1;
        const key = peg$currPos * 34 + 1;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c1) {
            s1 = peg$c1;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c2);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 2).toLowerCase() === peg$c3) {
                s1 = input.substr(peg$currPos, 2);
                peg$currPos += 2;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c4);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c5();
        }
        s0 = s1;
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseLogicOr() {
        let s0, s1, s2, s3, s4, s5, s6, s7;
        const key = peg$currPos * 34 + 2;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseLogicAnd();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
                s5 = peg$parseAndSign();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseLogicAnd();
                        if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseAndSign();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse_();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseLogicAnd();
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c0(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseAndSign() {
        let s0, s1;
        const key = peg$currPos * 34 + 3;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c6) {
            s1 = peg$c6;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c7);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 3).toLowerCase() === peg$c8) {
                s1 = input.substr(peg$currPos, 3);
                peg$currPos += 3;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c9);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c10();
        }
        s0 = s1;
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseLogicAnd() {
        let s0, s1, s2, s3, s4, s5, s6, s7;
        const key = peg$currPos * 34 + 4;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseCompOps();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
                s5 = peg$parseComparableOperators();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseCompOps();
                        if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseComparableOperators();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse_();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseCompOps();
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c11(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseComparableOperators() {
        let s0, s1;
        const key = peg$currPos * 34 + 5;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c12) {
            s1 = peg$c12;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c13);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 11).toLowerCase() === peg$c14) {
                s1 = input.substr(peg$currPos, 11);
                peg$currPos += 11;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c15);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c16();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c17) {
                s1 = peg$c17;
                peg$currPos += 2;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c18);
                }
            }
            if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 14).toLowerCase() === peg$c19) {
                    s1 = input.substr(peg$currPos, 14);
                    peg$currPos += 14;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c20);
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c21();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 61) {
                    s1 = peg$c22;
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c23);
                    }
                }
                if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c24) {
                        s1 = input.substr(peg$currPos, 5);
                        peg$currPos += 5;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c25);
                        }
                    }
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c26();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 2) === peg$c27) {
                        s1 = peg$c27;
                        peg$currPos += 2;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c28);
                        }
                    }
                    if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 8).toLowerCase() === peg$c29) {
                            s1 = input.substr(peg$currPos, 8);
                            peg$currPos += 8;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c30);
                            }
                        }
                    }
                    if (s1 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c31();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 60) {
                            s1 = peg$c32;
                            peg$currPos++;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c33);
                            }
                        }
                        if (s1 === peg$FAILED) {
                            if (input.substr(peg$currPos, 4).toLowerCase() === peg$c34) {
                                s1 = input.substr(peg$currPos, 4);
                                peg$currPos += 4;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c35);
                                }
                            }
                        }
                        if (s1 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c36();
                        }
                        s0 = s1;
                        if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            if (input.charCodeAt(peg$currPos) === 62) {
                                s1 = peg$c37;
                                peg$currPos++;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c38);
                                }
                            }
                            if (s1 === peg$FAILED) {
                                if (input.substr(peg$currPos, 7).toLowerCase() === peg$c39) {
                                    s1 = input.substr(peg$currPos, 7);
                                    peg$currPos += 7;
                                }
                                else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c40);
                                    }
                                }
                            }
                            if (s1 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c41();
                            }
                            s0 = s1;
                        }
                    }
                }
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseCompOps() {
        let s0, s1, s2, s3, s4, s5, s6, s7;
        const key = peg$currPos * 34 + 6;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parsePlusMinusOps();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
                s5 = peg$parsePlusMinusSigns();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parsePlusMinusOps();
                        if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parsePlusMinusSigns();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse_();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parsePlusMinusOps();
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c0(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parsePlusMinusSigns() {
        let s0, s1;
        const key = peg$currPos * 34 + 7;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 43) {
            s1 = peg$c42;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c43);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c44();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 45) {
                s1 = peg$c45;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c46);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c47();
            }
            s0 = s1;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parsePlusMinusOps() {
        let s0, s1, s2, s3, s4, s5, s6, s7;
        const key = peg$currPos * 34 + 8;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseMulDivOps();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
                s5 = peg$parseMulDivSigns();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseMulDivOps();
                        if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseMulDivSigns();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse_();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseMulDivOps();
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c0(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseMulDivSigns() {
        let s0, s1;
        const key = peg$currPos * 34 + 9;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 42) {
            s1 = peg$c48;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c49);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c50();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 47) {
                s1 = peg$c51;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c52);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c53();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 37) {
                    s1 = peg$c54;
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c55);
                    }
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c56();
                }
                s0 = s1;
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseMulDivOps() {
        let s0, s1, s2, s3, s4, s5, s6, s7;
        const key = peg$currPos * 34 + 10;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseBinaryFuncOp();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
                s5 = peg$parsePowerSigns();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseBinaryFuncOp();
                        if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parsePowerSigns();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse_();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseBinaryFuncOp();
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c0(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parsePowerSigns() {
        let s0, s1;
        const key = peg$currPos * 34 + 11;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 94) {
            s1 = peg$c57;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c58);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 5).toLowerCase() === peg$c59) {
                s1 = input.substr(peg$currPos, 5);
                peg$currPos += 5;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c61();
        }
        s0 = s1;
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseBinaryFuncOp() {
        let s0, s1, s2, s3, s4, s5, s6, s7;
        const key = peg$currPos * 34 + 12;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseFactor();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
                s5 = peg$parseBinFunctions();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseFactor();
                        if (s7 === peg$FAILED) {
                            s7 = null;
                        }
                        if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseBinFunctions();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse_();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseFactor();
                            if (s7 === peg$FAILED) {
                                s7 = null;
                            }
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c11(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseBinFunctions() {
        let s0, s1;
        const key = peg$currPos * 34 + 13;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c62) {
            s1 = peg$c62;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c63);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 8).toLowerCase() === peg$c64) {
                s1 = input.substr(peg$currPos, 8);
                peg$currPos += 8;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c65);
                }
            }
            if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 7).toLowerCase() === peg$c66) {
                    s1 = input.substr(peg$currPos, 7);
                    peg$currPos += 7;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c67);
                    }
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c68();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 11).toLowerCase() === peg$c69) {
                s1 = input.substr(peg$currPos, 11);
                peg$currPos += 11;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c70);
                }
            }
            if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 10).toLowerCase() === peg$c71) {
                    s1 = input.substr(peg$currPos, 10);
                    peg$currPos += 10;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c72);
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c73();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 5).toLowerCase() === peg$c74) {
                    s1 = input.substr(peg$currPos, 5);
                    peg$currPos += 5;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c75);
                    }
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c76();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 5).toLowerCase() === peg$c77) {
                        s1 = input.substr(peg$currPos, 5);
                        peg$currPos += 5;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c78);
                        }
                    }
                    if (s1 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c79();
                    }
                    s0 = s1;
                }
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseFactor() {
        let s0, s1, s2, s3, s4, s5;
        const key = peg$currPos * 34 + 14;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c80;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c81);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseExpression();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                            s5 = peg$c82;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c83);
                            }
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c84(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$parseFunctionOp();
            if (s0 === peg$FAILED) {
                s0 = peg$parseUnaryFunctionOp();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseAtom();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseArrayOp();
                    }
                }
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseFunctionOp() {
        let s0, s1, s2, s3, s4;
        const key = peg$currPos * 34 + 15;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseLettersAndDigits();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 40) {
                s2 = peg$c80;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c81);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseSequence();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                        s4 = peg$c82;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c83);
                        }
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c85(s1, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseUnaryFunctionOp() {
        let s0, s1, s2, s3;
        const key = peg$currPos * 34 + 16;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 33) {
            s1 = peg$c86;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c87);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 6).toLowerCase() === peg$c88) {
                s1 = input.substr(peg$currPos, 6);
                peg$currPos += 6;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c89);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseExpression();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c90(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseAtom();
            if (s1 !== peg$FAILED) {
                s2 = peg$parse_();
                if (s2 !== peg$FAILED) {
                    s3 = peg$parseUnFunctions();
                    if (s3 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c91(s1, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseUnFunctions() {
        let s0, s1;
        const key = peg$currPos * 34 + 17;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5).toLowerCase() === peg$c92) {
            s1 = input.substr(peg$currPos, 5);
            peg$currPos += 5;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c93);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c94();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 8).toLowerCase() === peg$c95) {
                s1 = input.substr(peg$currPos, 8);
                peg$currPos += 8;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c96);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c97();
            }
            s0 = s1;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseAtom() {
        let s0, s1, s2, s3, s4;
        const key = peg$currPos * 34 + 18;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c98) {
                s2 = peg$c98;
                peg$currPos += 9;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c99);
                }
            }
            if (s2 === peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c100) {
                    s2 = peg$c100;
                    peg$currPos += 4;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c101);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c102();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parse_();
            if (s1 !== peg$FAILED) {
                s2 = peg$parseConstValue();
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c103(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parse_();
                if (s1 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 123) {
                        s2 = peg$c104;
                        peg$currPos++;
                    }
                    else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c105);
                        }
                    }
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseValueInput();
                        if (s3 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                                s4 = peg$c106;
                                peg$currPos++;
                            }
                            else {
                                s4 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c107);
                                }
                            }
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c108(s3);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseConstValue() {
        let s0, s1, s2, s3;
        const key = peg$currPos * 34 + 19;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseLogicValue();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c109(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseArithmeticValue();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c109(s1);
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parseLettersAndDigits();
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c109(s1);
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 2) === peg$c110) {
                        s1 = peg$c110;
                        peg$currPos += 2;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c111);
                        }
                    }
                    if (s1 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c112();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.substr(peg$currPos, 2) === peg$c113) {
                            s1 = peg$c113;
                            peg$currPos += 2;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c114);
                            }
                        }
                        if (s1 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c112();
                        }
                        s0 = s1;
                        if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            if (input.charCodeAt(peg$currPos) === 39) {
                                s1 = peg$c115;
                                peg$currPos++;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c116);
                                }
                            }
                            if (s1 !== peg$FAILED) {
                                s2 = peg$parseAnyInput();
                                if (s2 !== peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 39) {
                                        s3 = peg$c115;
                                        peg$currPos++;
                                    }
                                    else {
                                        s3 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c116);
                                        }
                                    }
                                    if (s3 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c117(s2);
                                        s0 = s1;
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                            if (s0 === peg$FAILED) {
                                s0 = peg$currPos;
                                if (input.charCodeAt(peg$currPos) === 34) {
                                    s1 = peg$c118;
                                    peg$currPos++;
                                }
                                else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c119);
                                    }
                                }
                                if (s1 !== peg$FAILED) {
                                    s2 = peg$parseAnyInput();
                                    if (s2 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 34) {
                                            s3 = peg$c118;
                                            peg$currPos++;
                                        }
                                        else {
                                            s3 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c119);
                                            }
                                        }
                                        if (s3 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c117(s2);
                                            s0 = s1;
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                        }
                    }
                }
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseArrayOp() {
        let s0, s1, s2, s3;
        const key = peg$currPos * 34 + 20;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c120;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c121);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseSequence();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                    s3 = peg$c122;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c123);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c124(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseSequence() {
        let s0, s1, s2, s3, s4, s5, s6, s7;
        const key = peg$currPos * 34 + 21;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseExpression();
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                    s5 = peg$c125;
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c126);
                    }
                }
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseExpression();
                        if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                        s5 = peg$c125;
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c126);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse_();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseExpression();
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c127(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseLogicValue() {
        let s0, s1;
        const key = peg$currPos * 34 + 22;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4).toLowerCase() === peg$c128) {
            s1 = input.substr(peg$currPos, 4);
            peg$currPos += 4;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c129);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c130();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 5).toLowerCase() === peg$c131) {
                s1 = input.substr(peg$currPos, 5);
                peg$currPos += 5;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c132);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c133();
            }
            s0 = s1;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseArithmeticValue() {
        let s0, s1, s2;
        const key = peg$currPos * 34 + 23;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c134) {
            s1 = peg$c134;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c135);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseDigits();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c136();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (peg$c137.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c138);
                }
            }
            if (s1 === peg$FAILED) {
                s1 = null;
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parseNumber();
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c139(s1, s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseNumber() {
        let s0, s1, s2, s3;
        const key = peg$currPos * 34 + 24;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseDigits();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
                s2 = peg$c140;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c141);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseDigits();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c142();
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseNonZeroDigits();
            if (s1 !== peg$FAILED) {
                s2 = peg$parseDigits();
                if (s2 === peg$FAILED) {
                    s2 = null;
                }
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c143();
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 48) {
                    s1 = peg$c144;
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c145);
                    }
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c146();
                }
                s0 = s1;
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseValueInput() {
        let s0, s1, s2;
        const key = peg$currPos * 34 + 25;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseValueCharacters();
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parseValueCharacters();
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c147(s1);
        }
        s0 = s1;
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseAnyInput() {
        let s0, s1, s2;
        const key = peg$currPos * 34 + 26;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseAnyCharacters();
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parseAnyCharacters();
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c147(s1);
        }
        s0 = s1;
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseAnyCharacters() {
        let s0, s1;
        const key = peg$currPos * 34 + 27;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c148) {
            s1 = peg$c148;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c149);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c150();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c151) {
                s1 = peg$c151;
                peg$currPos += 2;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c152);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c153();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (peg$c154.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c155);
                    }
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c156();
                }
                s0 = s1;
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseValueCharacters() {
        let s0, s1;
        const key = peg$currPos * 34 + 28;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        if (peg$c157.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c158);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c156();
        }
        s0 = s1;
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseLettersAndDigits() {
        let s0, s1, s2, s3, s4, s5, s6;
        const key = peg$currPos * 34 + 29;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseLetters();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parseDigits();
            if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parseLetters();
                while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseLetters();
                }
                if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parseDigits();
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$parseLetters();
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$parseLetters();
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c156();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseDigits() {
        let s0, s1;
        const key = peg$currPos * 34 + 30;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = [];
        if (peg$c159.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c160);
            }
        }
        if (s1 !== peg$FAILED) {
            while (s1 !== peg$FAILED) {
                s0.push(s1);
                if (peg$c159.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c160);
                    }
                }
            }
        }
        else {
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseNonZeroDigits() {
        let s0, s1;
        const key = peg$currPos * 34 + 31;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = [];
        if (peg$c161.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c162);
            }
        }
        if (s1 !== peg$FAILED) {
            while (s1 !== peg$FAILED) {
                s0.push(s1);
                if (peg$c161.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c162);
                    }
                }
            }
        }
        else {
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseLetters() {
        let s0, s1;
        const key = peg$currPos * 34 + 32;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = [];
        if (peg$c163.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c164);
            }
        }
        if (s1 !== peg$FAILED) {
            while (s1 !== peg$FAILED) {
                s0.push(s1);
                if (peg$c163.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c164);
                    }
                }
            }
        }
        else {
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parse_() {
        let s0, s1;
        const key = peg$currPos * 34 + 33;
        const cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        peg$silentFails++;
        s0 = [];
        if (peg$c166.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c167);
            }
        }
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            if (peg$c166.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c167);
                }
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c165);
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function buildBinaryOperand(head, tail, isArithmeticOp = false) {
        return tail.reduce(function (result, elements) {
            return new BinaryOperand(elements[1], result, elements[3], isArithmeticOp);
        }, head);
    }
    function flattenArray(array) {
        return [].concat.apply([], array);
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
export const parse = peg$parse;
