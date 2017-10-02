import { observable, action, computed, toJS } from 'mobx';
import { ConditionRunner } from '../condition/conditions';
import QuestionValidator from '../validator';


export default class Question {
  @observable visible;
  @observable value = null;
  @observable error = null;
  @observable comment = null;
  @observable number;
  @observable questions = [];

  originalNumber;
  json;
  collection;
  conditionRunner;
  page;

  constructor(json, originalNumber?, collection?) {
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

  @computed get plainValue() {
    return toJS(this.value);
  }

  @action.bound setValue(value, comment = null) {
    console.log(this.json.name, 'set value : ', value)
    this.value = value;
    if (comment != null) {
      this.comment = comment;
    }

    if (this.collection) {
      // 2. check all questions's visibleIf
      this.collection.resetVisible();

      // 3. re-generate question order number
      this.collection.regenerateNumbers();

      // 4. triggers
      this.collection.triggers
        .filter(v => v.name === this.json.name && !v.isOnNextPage)
        .forEach(trigger => trigger.check(value));
    }
  }

  @action.bound setComment(comment) {
    this.comment = comment;
  }

  @action.bound setVisible(visible) {
    this.visible = visible;
  }

  @action.bound resetVisible() {
    if (this.conditionRunner) {
      const visible = this.conditionRunner.run(this.collection.conditionValues);
      this.visible = visible;
    }
  }

  @action.bound setError(error) {
    this.error = error;
  }

  @action.bound setPage(page) {
    this.page = page;
  }
}
