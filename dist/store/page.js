var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action, computed } from 'mobx';
import { ConditionRunner } from '../condition/conditions';
export default class Page {
    constructor(json, collection, pageIndex, questionNames) {
        this.json = json;
        this.collection = collection;
        this.pageIndex = pageIndex;
        this.questionNames = questionNames;
        this.name = json.name;
        this._visible = json.visible != null ? json.visible : true;
        this.conditionRunner = null;
        if (json.visibleIf) {
            this.conditionRunner = new ConditionRunner('');
            this.conditionRunner.expression = json.visibleIf;
        }
    }
    setVisible(visible) {
        this._visible = visible;
    }
    resetVisible() {
        if (this.conditionRunner) {
            const visible = this.conditionRunner.run(this.collection.conditionValues);
            this._visible = visible;
        }
    }
    get visible() {
        const questionVisible = this.questionNames.some(name => this.collection.questions[name].visible);
        return this._visible && questionVisible;
    }
}
__decorate([
    observable
], Page.prototype, "_visible", void 0);
__decorate([
    action.bound
], Page.prototype, "setVisible", null);
__decorate([
    action.bound
], Page.prototype, "resetVisible", null);
__decorate([
    computed
], Page.prototype, "visible", null);
