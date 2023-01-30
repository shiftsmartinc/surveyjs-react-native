import { observable, action, computed, toJS, makeObservable } from 'mobx';
import { getTriggerType, SurveyTrigger } from './trigger';
import moment from 'moment';
import { ConditionRunner } from './condition/conditions';
import QuestionValidator from './validator';
import { isValueEmpty } from './utils';

const getResponseValue = (obj: any, desc: string) => {
  var arr = desc.split('.');
  while (arr.length && (obj = obj[arr.shift()]));
  return obj;
};

const sortArray = (array: Array<string>, mult: number) => {
  return array.sort(function (a, b) {
    if (a < b) return -1 * mult;
    if (a > b) return 1 * mult;
    return 0;
  });
};

const randomizeArray = (array: Array<string>) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

class Page {
  _visible = true;
  collection: any = null;
  conditionRunner: any = null;
  json: any = null;
  name = '';
  pageIndex = 0;
  questionNames: any[] = [];

  constructor(json, collection, pageIndex, questionNames) {
    makeObservable(this, {
      _visible: observable,
      resetVisible: action.bound,
      setVisible: action.bound,
      visible: computed,
    });

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
    const questionVisible = this.questionNames.some(
      (name) => this.collection.questions[name].visible,
    );
    return this._visible && questionVisible;
  }
}

class Question {
  choices: any[] = [];
  collection: any = null;
  comment: any = null;
  conditionRunner: any = null;
  error: any = null;
  json: any = {};
  number = 0;
  originalNumber = 0;
  page = 0;
  questions: any[] = [];
  title = '';
  value = null;
  visible = false;

  constructor(json, originalNumber?, collection?) {
    makeObservable(this, {
      choices: observable,
      comment: observable,
      error: observable,
      number: observable,
      plainValue: computed,
      questions: observable,
      resetTitle: action.bound,
      resetVisible: action.bound,
      setComment: action.bound,
      setError: action.bound,
      setPage: action.bound,
      setValue: action.bound,
      setVisible: action.bound,
      title: observable,
      validate: action.bound,
      value: observable,
      visible: observable,
    });

    this.json = json;
    this.visible = json.visible != null ? json.visible : true;
    this.originalNumber = originalNumber;
    this.collection = collection;
    this.title = json.title;

    this.conditionRunner = null;
    if (json.choices && json.choices.length > 0) {
      const clonedChoices = json.choices.map((c) => c);
      this.choices = clonedChoices;
      if (json.choicesOrder && json.choicesOrder !== 'none') {
        let order = json.choicesOrder.toLowerCase();
        if (order == 'asc') {
          this.choices = sortArray(clonedChoices, 1);
        } else if (order == 'desc') {
          this.choices = sortArray(clonedChoices, -1);
        } else if (order == 'random') {
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
    this.value = (value && value.uri) || value;
    if (comment != null) {
      this.comment = comment;
    }

    if (this.collection) {
      // 2. check all questions's visibleIf
      this.collection.resetVisible();

      // 3. re-generate question order number
      this.collection.regenerateNumbers();

      // 4. re-generate question title
      this.collection.resetTitle();

      // 5. triggers
      this.collection.triggers
        .filter((v) => v.name === this.json.name && !v.isOnNextPage)
        .forEach((trigger) => trigger.check(value));

      if (
        this.json.type === 'file' &&
        this.collection.apis.onUpload &&
        value !== null
      ) {
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

  resetTitle() {
    const results = this.collection.results;
    const defaultTitle = this.json.title || this.json.name;
    const matches = defaultTitle.match(/{.+?}/g);
    let processedTitle = defaultTitle;
    if (matches) {
      matches.forEach((match: string) => {
        const valueName = match.replace('{', '').replace('}', '');
        const varValue = getResponseValue(results, valueName) || match;
        processedTitle = processedTitle.replace(match, varValue);
      });
    }
    this.title = processedTitle;
  }

  setError(error) {
    this.error = error;
  }

  setPage(page) {
    this.page = page;
  }
}

export default class Model {
  apis: any = null;
  curPageIndex = 0;
  isComplete = false;
  isPreview = false;
  originalNumber = 0;
  pages: any[] = [];
  questionNamesInOrder = [];
  questions: any = {};
  triggers: Array<SurveyTrigger> = [];

  constructor({ json, apis, isPreview = false }) {
    makeObservable(this, {
      conditionValues: computed,
      curPageIndex: observable,
      currentPageProps: computed,
      isComplete: observable,
      nextPage: action.bound,
      nextPageIndex: computed,
      prevPage: action.bound,
      prevPageIndex: computed,
      questions: observable,
      resetTitle: action.bound,
      resetVisible: action.bound,
      results: computed,
      setTriggerValue: action.bound,
    });

    if (isPreview) {
      json.pages = [
        {
          name: 'Preview',
          title: 'Preview',
          elements: json.pages.reduce(
            (prev, curr) => [...prev, ...curr.elements],
            [],
          ),
        },
      ];
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
    // validator
    const isValidatorFailed = this.currentPageProps.questions.some(
      (question) => !question.validate(),
    );
    if (isValidatorFailed) {
      return;
    }

    // checkOnPageTrigger
    const pageTriggers = this.triggers.filter((v) => v.isOnNextPage);
    const curPageQuestionNames = this.pages[this.curPageIndex].questionNames;
    const curPageTriggers = pageTriggers.filter(
      (v) => curPageQuestionNames.indexOf(v.name) !== -1,
    );
    curPageTriggers.forEach((trigger) =>
      trigger.check(this.questions[trigger.name].value),
    );

    // do next page
    if (this.nextPageIndex !== -1) {
      // this.curPageIndex = this.curPageIndex + 1;
      this.curPageIndex = this.nextPageIndex;
    } else {
      this.onComplete();
    }
  }

  prevPage() {
    if (this.prevPageIndex !== -1) {
      // this.curPageIndex = this.curPageIndex - 1;
      this.curPageIndex = this.prevPageIndex;
    }
  }

  resetVisible() {
    Object.keys(this.questions).forEach((name) =>
      this.questions[name].resetVisible(),
    );
    this.pages.forEach((page) => page.resetVisible());
  }

  resetTitle() {
    Object.keys(this.questions).forEach((name) =>
      this.questions[name].resetTitle(),
    );
  }

  get prevPageIndex() {
    const reversedPages = this.pages.slice().reverse();
    const page = reversedPages.find(
      (v) => v.visible && v.pageIndex < this.curPageIndex,
    );
    return page ? page.pageIndex : -1;
  }

  get nextPageIndex() {
    return this.pages.findIndex(
      (v) => v.visible && v.pageIndex > this.curPageIndex,
    );
  }

  get currentPageProps() {
    const page = this.pages.find((v) => v.pageIndex === this.curPageIndex);

    const pageProps = {
      name: page.name,
      questions: page.questionNames.map((name) => this.questions[name]),
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
    Object.keys(this.questions).forEach((name) => {
      const question = this.questions[name];
      const value = question.value;
      if (!isValueEmpty(value)) {
        values[name] = value;

        if (
          question.json.inputType === 'datetime' ||
          question.json.inputType === 'datetime-local'
        ) {
          values[name] = moment(value).format();
        } else if (question.json.inputType === 'date') {
          values[name] = moment(value).format('YYYY-MM-DD');
        } else if (question.json.inputType === 'time') {
          values[name] = moment(value).format('HH:mm');
        }
      }

      // handle hasComment , hasOther
      if (
        question.comment &&
        (question.json.hasComment || question.json.hasOther)
      ) {
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
  };

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

    const question = new Question(json, this.originalNumber++, this);
    this.questions[json.name] = question;

    if (json.type === 'multipletext') {
      question.questions = json.items.map((itemjson) => new Question(itemjson));
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
      (page.elements || page.questions || []).forEach((question) =>
        this.parseQuestion(question, questionNames),
      );
      // return {
      //   pageIndex,
      //   questionNames,
      //   name: page.name,
      // };
      const pageStore = new Page(page, this, pageIndex, questionNames);

      questionNames.forEach((name) => {
        this.questions[name].setPage(pageStore);
      });
      return pageStore;
    });
  };

  regenerateNumbers = () => {
    let count = 1;
    this.questionNamesInOrder.forEach((name) => {
      const question = this.questions[name];
      if (question.visible && question.page.visible) {
        question.number = count++;
      }
    });
  };

  initTriggers = (triggersJson = []) => {
    const owner = {
      doComplete: this.onComplete,
      getObjects: this.triggerGetObjects,
      setTriggerValue: this.setTriggerValue,
    };
    this.triggers = triggersJson.map((json) => {
      let TriggerType = getTriggerType(json);
      const trigger = new TriggerType(json);
      trigger.setOwner(owner);
      return trigger;
    });
  };

  triggerGetObjects = (pageNames, questionNames) => {
    const pages = this.pages.filter((v) => pageNames.indexOf(v.name) !== -1);
    const questions = questionNames.map((v) => this.questions[v]);
    return [...pages, ...questions];
  };

  setTriggerValue(name: string, value: any, isVariable: boolean) {
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
