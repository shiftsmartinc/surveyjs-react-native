var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action, computed, toJS } from 'mobx';
import { getTriggerType } from './trigger';
import moment from 'moment';
import { ConditionRunner } from './condition/conditions';
import QuestionValidator from './validator';
import { isValueEmpty } from './utils';
const sortArray = (array, mult) => {
    return array.sort(function (a, b) {
        if (a < b)
            return -1 * mult;
        if (a > b)
            return 1 * mult;
        return 0;
    });
};
const randomizeArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};
class Page {
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
class Question {
    constructor(json, originalNumber, collection) {
        this.value = null;
        this.error = null;
        this.comment = null;
        this.questions = [];
        this.choices = [];
        this.json = json;
        this.visible = json.visible != null ? json.visible : true;
        this.originalNumber = originalNumber;
        this.collection = collection;
        this.conditionRunner = null;
        if (json.choices && json.choices.length > 0) {
            const clonedChoices = json.choices.map(c => c);
            this.choices = clonedChoices;
            if (json.choicesOrder && json.choicesOrder !== "none") {
                let order = json.choicesOrder.toLowerCase();
                if (order == "asc") {
                    this.choices = sortArray(clonedChoices, 1);
                }
                else if (order == "desc") {
                    this.choices = sortArray(clonedChoices, -1);
                }
                else if (order == "random") {
                    this.choices = randomizeArray(clonedChoices);
                }
            }
        }
        if (json.visibleIf) {
            this.conditionRunner = new ConditionRunner('');
            this.conditionRunner.expression = json.visibleIf;
        }
    }
    validate() {
        if (this.value && typeof this.value === 'string') {
            this.value = this.value.trim();
        }
        const questionValidator = new QuestionValidator(this);
        return questionValidator.validate();
    }
    get plainValue() {
        return toJS(this.value);
    }
    setValue(value, comment = null) {
        this.value = value && value.uri || value;
        if (comment != null) {
            this.comment = comment;
        }
        if (this.collection) {
            this.collection.resetVisible();
            this.collection.regenerateNumbers();
            this.collection.triggers
                .filter(v => v.name === this.json.name && !v.isOnNextPage)
                .forEach(trigger => trigger.check(value));
            if (this.json.type === 'file' && this.collection.apis.onUpload && value !== null) {
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
            if (!visible) {
                this.value = null;
            }
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
    observable
], Question.prototype, "choices", void 0);
__decorate([
    action.bound
], Question.prototype, "validate", null);
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
export default class Model {
    constructor({ json, apis, isPreview = false }) {
        this.questions = {};
        this.curPageIndex = 0;
        this.isComplete = false;
        this.pages = [];
        this.triggers = [];
        this.originalNumber = 0;
        this.questionNamesInOrder = [];
        this.onComplete = () => {
            this.isComplete = true;
            if (this.apis.onComplete) {
                this.apis.onComplete(this.results);
            }
        };
        this.parseQuestion = (json, questionNames) => {
            if (json.type === 'panel') {
                json.showTitle = false;
            }
            questionNames.push(json.name);
            if (json.type !== 'html' && json.type !== 'panel') {
                this.questionNamesInOrder.push(json.name);
            }
            const question = new Question(json, this.originalNumber++, this);
            this.questions[json.name] = question;
            if (json.type === 'multipletext') {
                question.questions = json.items.map(itemjson => new Question(itemjson));
            }
        };
        this.initPages = (pagesJson) => {
            this.pages = pagesJson.map((page, pageIndex) => {
                const questionNames = [];
                (page.elements || page.questions || []).forEach(question => this.parseQuestion(question, questionNames));
                const pageStore = new Page(page, this, pageIndex, questionNames);
                questionNames.forEach((name) => {
                    this.questions[name].setPage(pageStore);
                });
                return pageStore;
            });
        };
        this.regenerateNumbers = () => {
            let count = 1;
            this.questionNamesInOrder.forEach((name) => {
                const question = this.questions[name];
                if (question.visible && question.page.visible) {
                    question.number = count++;
                }
            });
        };
        this.initTriggers = (triggersJson = []) => {
            const owner = {
                doComplete: this.onComplete,
                getObjects: this.triggerGetObjects,
                setTriggerValue: this.setTriggerValue,
            };
            this.triggers = triggersJson.map(json => {
                let TriggerType = getTriggerType(json);
                const trigger = new TriggerType(json);
                trigger.setOwner(owner);
                return trigger;
            });
        };
        this.triggerGetObjects = (pageNames, questionNames) => {
            const pages = this.pages.filter(v => pageNames.indexOf(v.name) !== -1);
            const questions = questionNames.map(v => this.questions[v]);
            return [...pages, ...questions];
        };
        if (isPreview) {
            json.pages = [{
                    name: 'Preview',
                    title: 'Preview',
                    elements: json.pages.reduce((prev, curr) => ([...prev, ...curr.elements]), []),
                }];
        }
        this.apis = apis;
        this.isPreview = isPreview;
        this.initStoreFromJson(json);
    }
    initStoreFromJson(json) {
        this.initPages(json.pages);
        this.initTriggers(json.triggers);
        this.regenerateNumbers();
    }
    nextPage() {
        const isValidatorFailed = this.currentPageProps.questions.some(question => !question.validate());
        if (isValidatorFailed) {
            return;
        }
        const pageTriggers = this.triggers.filter(v => v.isOnNextPage);
        const curPageQuestionNames = this.pages[this.curPageIndex].questionNames;
        const curPageTriggers = pageTriggers.filter(v => curPageQuestionNames.indexOf(v.name) !== -1);
        curPageTriggers.forEach(trigger => trigger.check(this.questions[trigger.name].value));
        if (this.nextPageIndex !== -1) {
            this.curPageIndex = this.nextPageIndex;
        }
        else {
            this.onComplete();
        }
    }
    prevPage() {
        if (this.prevPageIndex !== -1) {
            this.curPageIndex = this.prevPageIndex;
        }
    }
    resetVisible() {
        Object.keys(this.questions).forEach(name => this.questions[name].resetVisible());
        this.pages.forEach(page => page.resetVisible());
    }
    get prevPageIndex() {
        const reversedPages = this.pages.slice().reverse();
        const page = reversedPages.find(v => v.visible && v.pageIndex < this.curPageIndex);
        return page ? page.pageIndex : -1;
    }
    get nextPageIndex() {
        return this.pages.findIndex(v => v.visible && v.pageIndex > this.curPageIndex);
    }
    get currentPageProps() {
        const page = this.pages.find(v => v.pageIndex === this.curPageIndex);
        const pageProps = {
            name: page.name,
            questions: page.questionNames.map(name => this.questions[name]),
        };
        return pageProps;
    }
    get conditionValues() {
        const values = {};
        Object.keys(this.questions).forEach((name) => {
            values[name] = this.questions[name].value;
        });
        return values;
    }
    get results() {
        const values = {};
        Object.keys(this.questions).forEach(name => {
            const question = this.questions[name];
            const value = question.value;
            if (!isValueEmpty(value)) {
                values[name] = value;
                if (question.json.inputType === 'datetime' || question.json.inputType === 'datetime-local') {
                    values[name] = moment(value).format();
                }
                else if (question.json.inputType === 'date') {
                    values[name] = moment(value).format('YYYY-MM-DD');
                }
                else if (question.json.inputType === 'time') {
                    values[name] = moment(value).format('HH:mm');
                }
            }
            if (question.comment && (question.json.hasComment || question.json.hasOther)) {
                values[`${name}-Comment`] = question.comment;
            }
        });
        return values;
    }
    setTriggerValue(name, value, isVariable) {
        if (!name)
            return;
        if (!isVariable) {
            this.questions[name].setValue(value);
        }
    }
}
__decorate([
    observable
], Model.prototype, "questions", void 0);
__decorate([
    observable
], Model.prototype, "curPageIndex", void 0);
__decorate([
    observable
], Model.prototype, "isComplete", void 0);
__decorate([
    action.bound
], Model.prototype, "nextPage", null);
__decorate([
    action.bound
], Model.prototype, "prevPage", null);
__decorate([
    action.bound
], Model.prototype, "resetVisible", null);
__decorate([
    computed
], Model.prototype, "prevPageIndex", null);
__decorate([
    computed
], Model.prototype, "nextPageIndex", null);
__decorate([
    computed
], Model.prototype, "currentPageProps", null);
__decorate([
    computed
], Model.prototype, "conditionValues", null);
__decorate([
    computed
], Model.prototype, "results", null);
__decorate([
    action.bound
], Model.prototype, "setTriggerValue", null);
