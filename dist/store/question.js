var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action, computed, toJS } from 'mobx';
import { ConditionRunner } from '../condition/conditions';
import QuestionValidator from '../validator';
export default class Question {
    constructor(json, originalNumber, collection) {
        this.value = null;
        this.error = null;
        this.comment = null;
        this.questions = [];
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
    get plainValue() {
        return toJS(this.value);
    }
    setValue(value, comment = null) {
        this.value = value.uri || value;
        if (comment != null) {
            this.comment = comment;
        }
        if (this.collection) {
            this.collection.resetVisible();
            this.collection.regenerateNumbers();
            this.collection.triggers
                .filter(v => v.name === this.json.name && !v.isOnNextPage)
                .forEach(trigger => trigger.check(value));
            if (this.json.type === 'file' && this.collection.apis.onUpload) {
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
        }
    }
    setError(error) {
        this.error = error;
    }
    setPage(page) {
        this.page = page;
    }
}
__decorate([
    observable
], Question.prototype, "visible", void 0);
__decorate([
    observable
], Question.prototype, "value", void 0);
__decorate([
    observable
], Question.prototype, "error", void 0);
__decorate([
    observable
], Question.prototype, "comment", void 0);
__decorate([
    observable
], Question.prototype, "number", void 0);
__decorate([
    observable
], Question.prototype, "questions", void 0);
__decorate([
    computed
], Question.prototype, "plainValue", null);
__decorate([
    action.bound
], Question.prototype, "setValue", null);
__decorate([
    action.bound
], Question.prototype, "setComment", null);
__decorate([
    action.bound
], Question.prototype, "setVisible", null);
__decorate([
    action.bound
], Question.prototype, "resetVisible", null);
__decorate([
    action.bound
], Question.prototype, "setError", null);
__decorate([
    action.bound
], Question.prototype, "setPage", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RvcmUvcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxpQkFBaUIsTUFBTSxjQUFjLENBQUM7QUFFN0MsTUFBTSxDQUFDLE9BQU87SUFjWixZQUFZLElBQUksRUFBRSxjQUFlLEVBQUUsVUFBVztRQVpsQyxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFZixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBU3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxRCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUU3QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGlCQUFp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bSAnbW9ieCc7XG5pbXBvcnQgeyBDb25kaXRpb25SdW5uZXIgfSBmcm9tICcuLi9jb25kaXRpb24vY29uZGl0aW9ucyc7XG5pbXBvcnQgUXVlc3Rpb25WYWxpZGF0b3IgZnJvbSAnLi4vdmFsaWRhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlc3Rpb24ge1xuICBAb2JzZXJ2YWJsZSB2aXNpYmxlO1xuICBAb2JzZXJ2YWJsZSB2YWx1ZSA9IG51bGw7XG4gIEBvYnNlcnZhYmxlIGVycm9yID0gbnVsbDtcbiAgQG9ic2VydmFibGUgY29tbWVudCA9IG51bGw7XG4gIEBvYnNlcnZhYmxlIG51bWJlcjtcbiAgQG9ic2VydmFibGUgcXVlc3Rpb25zID0gW107XG5cbiAgb3JpZ2luYWxOdW1iZXI7XG4gIGpzb247XG4gIGNvbGxlY3Rpb247XG4gIGNvbmRpdGlvblJ1bm5lcjtcbiAgcGFnZTtcblxuICBjb25zdHJ1Y3Rvcihqc29uLCBvcmlnaW5hbE51bWJlcj8sIGNvbGxlY3Rpb24/KSB7XG4gICAgdGhpcy5qc29uID0ganNvbjtcbiAgICB0aGlzLnZpc2libGUgPSBqc29uLnZpc2libGUgIT0gbnVsbCA/IGpzb24udmlzaWJsZSA6IHRydWU7XG4gICAgdGhpcy5vcmlnaW5hbE51bWJlciA9IG9yaWdpbmFsTnVtYmVyO1xuICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG5cbiAgICB0aGlzLmNvbmRpdGlvblJ1bm5lciA9IG51bGw7XG4gICAgaWYgKGpzb24udmlzaWJsZUlmKSB7XG4gICAgICB0aGlzLmNvbmRpdGlvblJ1bm5lciA9IG5ldyBDb25kaXRpb25SdW5uZXIoJycpO1xuICAgICAgdGhpcy5jb25kaXRpb25SdW5uZXIuZXhwcmVzc2lvbiA9IGpzb24udmlzaWJsZUlmO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlKCkge1xuICAgIGNvbnN0IHF1ZXN0aW9uVmFsaWRhdG9yID0gbmV3IFF1ZXN0aW9uVmFsaWRhdG9yKHRoaXMpO1xuICAgIHJldHVybiBxdWVzdGlvblZhbGlkYXRvci52YWxpZGF0ZSgpO1xuICB9XG5cbiAgQGNvbXB1dGVkIGdldCBwbGFpblZhbHVlKCkge1xuICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgQGFjdGlvbi5ib3VuZCBzZXRWYWx1ZSh2YWx1ZSwgY29tbWVudCA9IG51bGwpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUudXJpIHx8IHZhbHVlO1xuICAgIGlmIChjb21tZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29tbWVudCA9IGNvbW1lbnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbikge1xuICAgICAgLy8gMi4gY2hlY2sgYWxsIHF1ZXN0aW9ucydzIHZpc2libGVJZlxuICAgICAgdGhpcy5jb2xsZWN0aW9uLnJlc2V0VmlzaWJsZSgpO1xuXG4gICAgICAvLyAzLiByZS1nZW5lcmF0ZSBxdWVzdGlvbiBvcmRlciBudW1iZXJcbiAgICAgIHRoaXMuY29sbGVjdGlvbi5yZWdlbmVyYXRlTnVtYmVycygpO1xuXG4gICAgICAvLyA0LiB0cmlnZ2Vyc1xuICAgICAgdGhpcy5jb2xsZWN0aW9uLnRyaWdnZXJzXG4gICAgICAgIC5maWx0ZXIodiA9PiB2Lm5hbWUgPT09IHRoaXMuanNvbi5uYW1lICYmICF2LmlzT25OZXh0UGFnZSlcbiAgICAgICAgLmZvckVhY2godHJpZ2dlciA9PiB0cmlnZ2VyLmNoZWNrKHZhbHVlKSk7XG5cbiAgICAgIGlmICh0aGlzLmpzb24udHlwZSA9PT0gJ2ZpbGUnICYmIHRoaXMuY29sbGVjdGlvbi5hcGlzLm9uVXBsb2FkKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5hcGlzLm9uVXBsb2FkKHZhbHVlLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBAYWN0aW9uLmJvdW5kIHNldENvbW1lbnQoY29tbWVudCkge1xuICAgIHRoaXMuY29tbWVudCA9IGNvbW1lbnQ7XG4gIH1cblxuICBAYWN0aW9uLmJvdW5kIHNldFZpc2libGUodmlzaWJsZSkge1xuICAgIHRoaXMudmlzaWJsZSA9IHZpc2libGU7XG4gIH1cblxuICBAYWN0aW9uLmJvdW5kIHJlc2V0VmlzaWJsZSgpIHtcbiAgICBpZiAodGhpcy5jb25kaXRpb25SdW5uZXIpIHtcbiAgICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLmNvbmRpdGlvblJ1bm5lci5ydW4odGhpcy5jb2xsZWN0aW9uLmNvbmRpdGlvblZhbHVlcyk7XG4gICAgICB0aGlzLnZpc2libGUgPSB2aXNpYmxlO1xuICAgIH1cbiAgfVxuXG4gIEBhY3Rpb24uYm91bmQgc2V0RXJyb3IoZXJyb3IpIHtcbiAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gIH1cblxuICBAYWN0aW9uLmJvdW5kIHNldFBhZ2UocGFnZSkge1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gIH1cbn1cbiJdfQ==