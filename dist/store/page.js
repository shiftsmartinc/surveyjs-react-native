var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action, computed } from 'mobx';
import { ConditionRunner } from '../condition/conditions';
export default class Page {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9yZS9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU87SUFVWixZQUFZLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGFBQWE7UUFDcEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUczRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUM7SUFFYSxVQUFVLENBQUMsT0FBTztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBRWEsWUFBWTtRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQzFCLENBQUM7SUFDSCxDQUFDO0lBRVMsSUFBSSxPQUFPO1FBQ25CLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FDeEMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQztJQUMxQyxDQUFDO0NBRUY7QUF6Q2E7SUFBWCxVQUFVO3NDQUFVO0FBdUJQO0lBQWIsTUFBTSxDQUFDLEtBQUs7c0NBRVo7QUFFYTtJQUFiLE1BQU0sQ0FBQyxLQUFLO3dDQUtaO0FBRVM7SUFBVCxRQUFRO21DQUtSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JzZXJ2YWJsZSwgYWN0aW9uLCBjb21wdXRlZCB9IGZyb20gJ21vYngnO1xuaW1wb3J0IHsgQ29uZGl0aW9uUnVubmVyIH0gZnJvbSAnLi4vY29uZGl0aW9uL2NvbmRpdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIHtcbiAgY29sbGVjdGlvbjtcbiAgbmFtZTtcbiAgQG9ic2VydmFibGUgX3Zpc2libGU7XG4gIGpzb247XG4gIHF1ZXN0aW9uTmFtZXM7XG4gIHBhZ2VJbmRleDtcblxuICBjb25kaXRpb25SdW5uZXI7XG5cbiAgY29uc3RydWN0b3IoanNvbiwgY29sbGVjdGlvbiwgcGFnZUluZGV4LCBxdWVzdGlvbk5hbWVzKSB7XG4gICAgdGhpcy5qc29uID0ganNvbjtcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uXG4gICAgdGhpcy5wYWdlSW5kZXggPSBwYWdlSW5kZXg7XG4gICAgdGhpcy5xdWVzdGlvbk5hbWVzID0gcXVlc3Rpb25OYW1lcztcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWU7XG4gICAgdGhpcy5fdmlzaWJsZSA9IGpzb24udmlzaWJsZSAhPSBudWxsID8ganNvbi52aXNpYmxlIDogdHJ1ZTtcblxuXG4gICAgdGhpcy5jb25kaXRpb25SdW5uZXIgPSBudWxsO1xuICAgIGlmIChqc29uLnZpc2libGVJZikge1xuICAgICAgdGhpcy5jb25kaXRpb25SdW5uZXIgPSBuZXcgQ29uZGl0aW9uUnVubmVyKCcnKTtcbiAgICAgIHRoaXMuY29uZGl0aW9uUnVubmVyLmV4cHJlc3Npb24gPSBqc29uLnZpc2libGVJZjtcbiAgICB9XG4gIH1cblxuICBAYWN0aW9uLmJvdW5kIHNldFZpc2libGUodmlzaWJsZSkge1xuICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xuICB9XG5cbiAgQGFjdGlvbi5ib3VuZCByZXNldFZpc2libGUoKSB7XG4gICAgaWYgKHRoaXMuY29uZGl0aW9uUnVubmVyKSB7XG4gICAgICBjb25zdCB2aXNpYmxlID0gdGhpcy5jb25kaXRpb25SdW5uZXIucnVuKHRoaXMuY29sbGVjdGlvbi5jb25kaXRpb25WYWx1ZXMpO1xuICAgICAgdGhpcy5fdmlzaWJsZSA9IHZpc2libGU7XG4gICAgfVxuICB9XG5cbiAgQGNvbXB1dGVkIGdldCB2aXNpYmxlKCkge1xuICAgIGNvbnN0IHF1ZXN0aW9uVmlzaWJsZSA9IHRoaXMucXVlc3Rpb25OYW1lcy5zb21lKG5hbWUgPT5cbiAgICAgIHRoaXMuY29sbGVjdGlvbi5xdWVzdGlvbnNbbmFtZV0udmlzaWJsZVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGUgJiYgcXVlc3Rpb25WaXNpYmxlO1xuICB9XG5cbn1cbiJdfQ==