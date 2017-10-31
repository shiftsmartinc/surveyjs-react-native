import { observable, action, computed, toJS } from 'mobx';

export default class Question {
  @observable value = null;
  json;

  constructor(json) {
    this.json = json;
  }

  @computed get plainValue() {
    return toJS(this.value);
  }

  @action.bound setValue(value) {
    this.value = value;
  }
}
