import { observable, action, computed, makeObservable } from "mobx";
import { ConditionRunner } from "./condition/conditions";

export default class Page {
    collection;
    name;
    @observable _visible;
    json;
    questionNames;
    pageIndex;
  
    conditionRunner;
  
    constructor(json, collection, pageIndex, questionNames) {
      makeObservable(this);
      this.json = json;
      this.collection = collection;
      this.pageIndex = pageIndex;
      this.questionNames = questionNames;
      this.name = json.name;
      this._visible = json.visible != null ? json.visible : true;
  
      this.conditionRunner = null;
      if (json.visibleIf) {
        this.conditionRunner = new ConditionRunner("");
        this.conditionRunner.expression = json.visibleIf;
      }
    }
  
    @action.bound setVisible(visible) {
      this._visible = visible;
    }
  
    @action.bound resetVisible() {
      if (this.conditionRunner) {
        const visible = this.conditionRunner.run(this.collection.conditionValues);
        this._visible = visible;
      }
    }
  
    @computed get visible() {
      const questionVisible = this.questionNames.some(
        (name) => this.collection.questions[name].visible
      );
      return this._visible && questionVisible;
    }
  }