import { observable, action, computed } from 'mobx';
import { ConditionRunner } from './condition/conditions';


class Question {
  @observable visible;
  @observable value = null;
  @observable error = null;
  @observable comment = null;
  @observable number;
  originalNumber;
  json;
  collection;
  conditionRunner;

  constructor(json, originalNumber, collection) {
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

  @action.bound setValue(value, comment = null) {
    this.value = value;
    this.comment = comment;

    // 2. check all questions's visibleIf
    this.collection.resetVisible();

    // 3. re-generate question order number
    // 4. triggers
  }

  // @action.bound setVisible(visible) {
  //   this.visible = visible;
  // }

  @action.bound resetVisible() {
    if (this.conditionRunner) {
      const visible = this.conditionRunner.run(this.collection.conditionValues);
      this.visible = visible;
    }
  }
}

class Page {
  collection;
  name;
  @observable visible;
  json;
  questionNames;
  pageIndex;

  conditionRunner;

  constructor(json, collection, pageIndex, questionNames) {
    this.json = json;
    this.collection = collection
    this.pageIndex = pageIndex;
    this.questionNames = questionNames;
    this.name = json.name;
    this.visible = json.visible != null ? json.visible : true;


    this.conditionRunner = null;
    if (json.visibleIf) {
      this.conditionRunner = new ConditionRunner('');
      this.conditionRunner.expression = json.visibleIf;
    }
  }

  @action.bound resetVisible() {
    if (this.conditionRunner) {
      const visible = this.conditionRunner.run(this.collection.conditionValues);
      this.visible = visible;
    }
  }

}

interface Istore {
  onComplete();
}

export default class store {
  @observable questions = {};
  @observable curPageIndex = 0;

  pages = [];

  triggers = [];

  apis: Istore = null;

  originalNumber = 0;

  questionNamesInOrder = [];

  constructor(json, apis) {
    this.initStoreFromJson(json);
    this.apis = apis;
  }

  initStoreFromJson(json) {
    this.initPages(json.pages);
    this.regenerateNumbers();
  }

  @action.bound nextPage() {
    if (this.nextPageIndex !== -1) {
      // this.curPageIndex = this.curPageIndex + 1;
      this.curPageIndex = this.nextPageIndex;
    } else {
      this.apis.onComplete();
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
    const values = {};
    Object.keys(this.questions).forEach(name =>
      values[name] = this.questions[name].value
    );
    return values;
  }

  parseQuestion = (question, questionNames) => {
    if (question.type === 'panel') {
      question.elements.forEach(subQuestion => this.parseQuestion(subQuestion, questionNames));
    }
    questionNames.push(question.name);
    this.questionNamesInOrder.push(question.name);

    this.questions[question.name] = new Question(
      question,
      this.originalNumber++,
      this,
    );
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
      page.elements.forEach(question => this.parseQuestion(question, questionNames));
      // return {
      //   pageIndex,
      //   questionNames,
      //   name: page.name,
      // };
      return new Page(
        page,
        this,
        pageIndex,
        questionNames,
      );
    })
  }

  regenerateNumbers = () => {
    this.questionNamesInOrder.forEach((name, idx) => {
      this.questions[name].number = idx;
    });
  }

}

