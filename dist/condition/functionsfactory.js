export class FunctionFactory {
    constructor() {
        this.functionHash = {};
    }
    register(name, func) {
        this.functionHash[name] = func;
    }
    clear() {
        this.functionHash = {};
    }
    getAll() {
        var result = [];
        for (var key in this.functionHash) {
            result.push(key);
        }
        return result.sort();
    }
    run(name, params) {
        var func = this.functionHash[name];
        if (!func)
            return null;
        return func(params);
    }
}
FunctionFactory.Instance = new FunctionFactory();
function sum(params) {
    var res = 0;
    for (var i = 0; i < params.length; i++) {
        res += params[i];
    }
    return res;
}
FunctionFactory.Instance.register("sum", sum);
function age(params) {
    if (params.length < 1)
        return -1;
    var birthDay = new Date(params[0]);
    var ageDifMs = Date.now() - birthDay.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
FunctionFactory.Instance.register("age", age);
