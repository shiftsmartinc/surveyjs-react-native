/**
 * A base class for all triggers.
 * A trigger calls a method when the expression change the result: from false to true or from true to false.
 * Please note, it runs only one changing the expression result.
 */
export class Trigger {
    constructor() {
        this.opValue = "equal";
    }
    static get operators() {
        if (Trigger.operatorsValue != null)
            return Trigger.operatorsValue;
        Trigger.operatorsValue = {
            empty: function (value, _) { return !value; },
            notempty: function (value, _) { return !(!value); },
            equal: function (value, expectedValue) { return value == expectedValue; },
            notequal: function (value, expectedValue) { return value != expectedValue; },
            contains: function (value, expectedValue) { return value && value["indexOf"] && value.indexOf(expectedValue) > -1; },
            notcontains: function (value, expectedValue) { return !value || !value["indexOf"] || value.indexOf(expectedValue) == -1; },
            greater: function (value, expectedValue) { return value > expectedValue; },
            less: function (value, expectedValue) { return value < expectedValue; },
            greaterorequal: function (value, expectedValue) { return value >= expectedValue; },
            lessorequal: function (value, expectedValue) { return value <= expectedValue; }
        };
        return Trigger.operatorsValue;
    }
    getType() { return "triggerbase"; }
    get operator() { return this.opValue; }
    set operator(value) {
        if (!value)
            return;
        value = value.toLowerCase();
        if (!Trigger.operators[value])
            return;
        this.opValue = value;
    }
    check(value) {
        if (Trigger.operators[this.operator](value, this.value)) {
            this.onSuccess();
        }
        else {
            this.onFailure();
        }
    }
    onSuccess() { }
    onFailure() { }
}
Trigger.operatorsValue = null;
/**
 * It extends the Trigger base class and add properties required for SurveyJS classes.
 */
export class SurveyTrigger extends Trigger {
    constructor(json) {
        super();
        // protected owner: ISurveyTriggerOwner = null;
        this.owner = null;
        this.name = json.name;
        this.operator = json.operator;
        this.value = json.value;
    }
    setOwner(owner) {
        this.owner = owner;
    }
    get isOnNextPage() { return false; }
}
/**
 * If expression returns true, it makes questions/pages visible.
 * Ohterwise it makes them invisible.
 */
export class SurveyTriggerVisible extends SurveyTrigger {
    constructor(json) {
        super(json);
        this.pages = [];
        this.questions = [];
    }
    getType() { return "visibletrigger"; }
    onSuccess() { this.onTrigger(this.onItemSuccess); }
    onFailure() { this.onTrigger(this.onItemFailure); }
    onTrigger(func) {
        if (!this.owner)
            return;
        var objects = this.owner.getObjects(this.pages, this.questions);
        for (var i = 0; i < objects.length; i++) {
            func(objects[i]);
        }
    }
    onItemSuccess(item) { item.setVisible(true); }
    onItemFailure(item) { item.setVisible(false); }
}
/**
 * If expression returns true, it completes the survey.
 */
export class SurveyTriggerComplete extends SurveyTrigger {
    constructor(json) {
        super(json);
    }
    getType() { return "completetrigger"; }
    get isOnNextPage() { return true; }
    onSuccess() { if (this.owner)
        this.owner.doComplete(); }
}
export class SurveyTriggerSetValue extends SurveyTrigger {
    constructor(json) {
        super(json);
        this.setToName = json.setToName;
        this.setValue = json.setValue;
    }
    getType() { return "setvaluetrigger"; }
    onSuccess() {
        if (!this.setToName || !this.owner)
            return;
        this.owner.setTriggerValue(this.setToName, this.setValue, this.isVariable);
    }
}
export const getTriggerType = (json) => {
    if (json.type === 'complete') {
        return SurveyTriggerComplete;
    }
    else if (json.type === 'setvalue') {
        return SurveyTriggerSetValue;
    }
    else if (json.type === 'visible') {
        return SurveyTriggerVisible;
    }
    return SurveyTrigger;
};
