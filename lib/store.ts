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

export default class store {
  @observable questions = {};
  @observable curPageIndex = 0;

  pages = [];

  triggers = [];

  originalNumber = 0;

  questionNamesInOrder = [];

  constructor(json) {
    this.initStoreFromJson(json);
  }

  initStoreFromJson(json) {
    this.initPages(json.pages);
    this.regenerateNumbers();
  }

  @action.bound nextPage() {
    if (this.hasNextPage) {
      this.curPageIndex = this.curPageIndex + 1;
    } else {
      console.log('complete');
    }
  }

  @action.bound prevPage() {
    if (this.curPageIndex > 0) {
      this.curPageIndex = this.curPageIndex - 1;
    }
  }

  @action.bound resetVisible() {
    Object.keys(this.questions).forEach(name => this.questions[name].resetVisible());
  }

  @computed get hasPrevPage() {
    return this.curPageIndex > 0;
  }

  @computed get hasNextPage() {
    const totalPage = this.pages.length;
    return this.curPageIndex < (totalPage - 1);
  }

  @computed get currentPageProps() {
    const page = this.pages[this.curPageIndex];

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
      return {
        pageIndex,
        questionNames,
        name: page.name,
      };
    })
  }

  regenerateNumbers = () => {
    this.questionNamesInOrder.forEach((name, idx) => {
      this.questions[name].number = idx;
    });
  }

}

