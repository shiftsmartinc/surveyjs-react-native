var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action, computed, toJS } from 'mobx';
import { ConditionRunner } from '../condition/conditions';
import QuestionValidator from '../validator';
export default class Question {
    constructor(json, originalNumber, collection) {
        this.value = null;
        this.error = null;
        this.comment = null;
        this.questions = [];
        this.json = json;
        this.visible = json.visible != null ? json.visible : true;
        this.originalNumber = originalNumber;
        this.collection = collection;
        this.conditionRunner = null;
        if (json.visibleIf) {
            this.conditionRunner = new ConditionRunner('');
            this.conditionRunner.expression = json.visibleIf;
        }
    }
    validate() {
        const questionValidator = new QuestionValidator(this);
        return questionValidator.validate();
    }
    get plainValue() {
        return toJS(this.value);
    }
    setValue(value, comment = null) {
        this.value = value.uri || value;
        if (comment != null) {
            this.comment = comment;
        }
        if (this.collection) {
            this.collection.resetVisible();
            this.collection.regenerateNumbers();
            this.collection.triggers
                .filter(v => v.name === this.json.name && !v.isOnNextPage)
                .forEach(trigger => trigger.check(value));
            if (this.json.type === 'file' && this.collection.apis.onUpload) {
                this.collection.apis.onUpload(value, this);
            }
        }
    }
    setComment(comment) {
        this.comment = comment;
    }
    setVisible(visible) {
        this.visible = visible;
    }
    resetVisible() {
        if (this.conditionRunner) {
            const visible = this.conditionRunner.run(this.collection.conditionValues);
            this.visible = visible;
        }
    }
    setError(error) {
        this.error = error;
    }
    setPage(page) {
        this.page = page;
    }
}
__decorate([
    observable
], Question.prototype, "visible", void 0);
__decorate([
    observable
], Question.prototype, "value", void 0);
__decorate([
    observable
], Question.prototype, "error", void 0);
__decorate([
    observable
], Question.prototype, "comment", void 0);
__decorate([
    observable
], Question.prototype, "number", void 0);
__decorate([
    observable
], Question.prototype, "questions", void 0);
__decorate([
    computed
], Question.prototype, "plainValue", null);
__decorate([
    action.bound
], Question.prototype, "setValue", null);
__decorate([
    action.bound
], Question.prototype, "setComment", null);
__decorate([
    action.bound
], Question.prototype, "setVisible", null);
__decorate([
    action.bound
], Question.prototype, "resetVisible", null);
__decorate([
    action.bound
], Question.prototype, "setError", null);
__decorate([
    action.bound
], Question.prototype, "setPage", null);
