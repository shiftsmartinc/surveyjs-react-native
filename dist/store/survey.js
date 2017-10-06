var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action, computed } from 'mobx';
import { getTriggerType } from '../trigger';
import { isValueEmpty } from '../utils';
import Question from './question';
import Page from './page';
import moment from 'moment';
export default class Survey {
    constructor(json, apis) {
        this.questions = {};
        this.curPageIndex = 0;
        this.isComplete = false;
        this.pages = [];
        this.triggers = [];
        this.apis = null;
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
                (page.elements || page.questions).forEach(question => this.parseQuestion(question, questionNames));
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
        this.apis = apis;
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
], Survey.prototype, "questions", void 0);
__decorate([
    observable
], Survey.prototype, "curPageIndex", void 0);
__decorate([
    observable
], Survey.prototype, "isComplete", void 0);
__decorate([
    action.bound
], Survey.prototype, "nextPage", null);
__decorate([
    action.bound
], Survey.prototype, "prevPage", null);
__decorate([
    action.bound
], Survey.prototype, "resetVisible", null);
__decorate([
    computed
], Survey.prototype, "prevPageIndex", null);
__decorate([
    computed
], Survey.prototype, "nextPageIndex", null);
__decorate([
    computed
], Survey.prototype, "currentPageProps", null);
__decorate([
    computed
], Survey.prototype, "conditionValues", null);
__decorate([
    computed
], Survey.prototype, "results", null);
__decorate([
    action.bound
], Survey.prototype, "setTriggerValue", null);
