import { observable, action, computed } from 'mobx';
import { getTriggerType, SurveyTrigger } from '../trigger';
import { isValueEmpty } from '../utils';
import Question from './question';
import Page from './page';
import moment from 'moment';

export interface ISurvey {
  onComplete(results);
}

export default class Survey {
  @observable questions = {};
  @observable curPageIndex = 0;
  @observable isComplete = false;

  pages = [];

  triggers: Array<SurveyTrigger> = [];

  apis: ISurvey = null;

  originalNumber = 0;

  questionNamesInOrder = [];

  constructor(json, apis) {
    this.apis = apis;
    this.initStoreFromJson(json);
  }

  initStoreFromJson(json) {
    this.initPages(json.pages);
    this.initTriggers(json.triggers);
    this.regenerateNumbers();
  }

  @action.bound nextPage() {

    // validator
    const isValidatorFailed = this.currentPageProps.questions.some(
      question => !question.validate()
    );
    if (isValidatorFailed) {
      return;
    }

    // checkOnPageTrigger
    const pageTriggers = this.triggers.filter(v => v.isOnNextPage);
    const curPageQuestionNames = this.pages[this.curPageIndex].questionNames;
    const curPageTriggers = pageTriggers.filter(v => curPageQuestionNames.indexOf(v.name) !== -1);
    curPageTriggers.forEach(trigger => trigger.check(this.questions[trigger.name].value));

    // do next page
    if (this.nextPageIndex !== -1) {
      // this.curPageIndex = this.curPageIndex + 1;
      this.curPageIndex = this.nextPageIndex;
    } else {
      this.onComplete();
    }
  }

  @action.bound prevPage() {
    if (this.prevPageIndex !== -1) {
      // this.curPageIndex = this.curPageIndex - 1;
      this.curPageIndex = this.prevPageIndex;
    }
  }

  @action.bound resetVisible() {
    Object.keys(this.questions).forEach(name => this.questions[name].resetVisible());
    this.pages.forEach(page => page.resetVisible());
  }

  @computed get prevPageIndex() {
    const reversedPages = this.pages.slice().reverse();
    const page = reversedPages.find(v => v.visible && v.pageIndex < this.curPageIndex);
    return page ? page.pageIndex : -1;
  }

  @computed get nextPageIndex() {
    return this.pages.findIndex(v => v.visible && v.pageIndex > this.curPageIndex);
  }

  @computed get currentPageProps() {
    const page = this.pages.find(v => v.pageIndex === this.curPageIndex);

    const pageProps = {
      name: page.name,
      questions: page.questionNames.map(name => this.questions[name]),
    };
    return pageProps;
  }

  @computed get conditionValues() {
    const values = {}
    Object.keys(this.questions).forEach((name) => {
      values[name] = this.questions[name].value;
    });
    return values;
  }

  @computed get results() {
    const values = {};
    Object.keys(this.questions).forEach(name => {
      const question = this.questions[name];
      const value = question.value;
      if (!isValueEmpty(value)) {
        values[name] = value;

        if (question.json.inputType === 'datetime' || question.json.inputType === 'datetime-local') {
          values[name] = moment(value).format();
        } else if (question.json.inputType === 'date') {
          values[name] = moment(value).format('YYYY-MM-DD');
        } else if (question.json.inputType === 'time') {
          values[name] = moment(value).format('HH:mm');
        }
      }

      // handle hasComment , hasOther
      if (question.comment && (question.json.hasComment || question.json.hasOther)) {
        values[`${name}-Comment`] = question.comment;
      }

    });
    return values;
  }

  onComplete = () => {
    this.isComplete = true;
    if (this.apis.onComplete) {
      this.apis.onComplete(this.results);
    }
  }

  parseQuestion = (json, questionNames) => {
    if (json.type === 'panel') {
      json.showTitle = false;
      // question.elements.forEach(subQuestion => this.parseQuestion(subQuestion, questionNames));
    }
    questionNames.push(json.name);
    // question html is designed for display, do not add number to it.
    if (json.type !== 'html' && json.type !== 'panel') {
      this.questionNamesInOrder.push(json.name);
    }


    const question = new Question(
      json,
      this.originalNumber++,
      this,
    );
    this.questions[json.name] = question;

    if (json.type === 'multipletext') {
      question.questions = json.items.map(itemjson =>
        new Question(itemjson)
      );
    }


    // this.questions[question.name] = {
    //   json: question,
    //   visible: question.visible,
    //   value: null,
    //   originalNumber: this.originalNumber++,
    //   comment: null,
    //   error: null,
    // };
  };

  initPages = (pagesJson) => {
    this.pages = pagesJson.map((page, pageIndex) => {
      const questionNames = [];
      (page.elements || page.questions).forEach(question => this.parseQuestion(question, questionNames));
      // return {
      //   pageIndex,
      //   questionNames,
      //   name: page.name,
      // };
      const pageStore = new Page(
        page,
        this,
        pageIndex,
        questionNames,
      );

      questionNames.forEach((name) => {
        this.questions[name].setPage(pageStore);
      })
      return pageStore;
    })
  }

  regenerateNumbers = () => {
    let count = 1;
    this.questionNamesInOrder.forEach((name) => {
      const question = this.questions[name];
      if (question.visible && question.page.visible) {
        question.number = count++;
      }
    });
  }

  initTriggers = (triggersJson = []) => {
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
  }

  triggerGetObjects = (pageNames, questionNames) => {
    const pages = this.pages.filter(v => pageNames.indexOf(v.name) !== -1);
    const questions = questionNames.map(v => this.questions[v]);
    return [...pages, ...questions];
  }

  @action.bound setTriggerValue(name: string, value: any, isVariable: boolean) {
    if (!name) return;
    if (!isVariable) {
      this.questions[name].setValue(value);
    }
    // if (isVariable) {
    //   this.setVariable(name, value);
    // } else {
    //   this.setValue(name, value);
    // }
  }

}

