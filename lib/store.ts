import { observable, action, computed } from 'mobx';


// class Question {
//   @observable visible;
//   @observable value = null;
//   @observable error = null;
//   @observable comment = null;
//   @observable number;
//   originalNumber;

//   constructor(json, originalNumber) {
//     this.visible = json.visible;
//     this.originalNumber = originalNumber;
//   }

//   @action.bound setValue() {

//   }
// }

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

  @action.bound setValue(name, value, comment = null) {
    // 1. set value
    // 2. check all questions's visibleIf
    // 3. re-generate question order number
    // 4. triggers

    console.log('name / value / comment: ', name, value, comment);
    console.log('this.questions: ', this.questions);
    this.questions[name].value = value;
    this.questions[name].comment = comment;

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
    console.log('computed: ', pageProps);
    return pageProps;
  }

  parseQuestion = (question, questionNames) => {
    if (question.type === 'panel') {
      question.elements.forEach(subQuestion => this.parseQuestion(subQuestion, questionNames));
    }
    questionNames.push(question.name);
    this.questionNamesInOrder.push(question.name);

    // this.questions[question.name] = new Question(question, this.originalNumber++);
    this.questions[question.name] = {
      json: question,
      visible: question.visible,
      value: null,
      originalNumber: this.originalNumber++,
      comment: null,
      error: null,
    };
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

