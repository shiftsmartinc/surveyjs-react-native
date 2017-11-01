var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, action, computed, toJS } from 'mobx';
export default class Question {
    constructor(json) {
        this.value = null;
        this.json = json;
    }
    get plainValue() {
        return toJS(this.value);
    }
    setValue(value) {
        this.value = value;
    }
}
__decorate([
    observable
], Question.prototype, "value", void 0);
__decorate([
    computed
], Question.prototype, "plainValue", null);
__decorate([
    action.bound
], Question.prototype, "setValue", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVUZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0b3JlL211bHRpcGxlVGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPO0lBSVosWUFBWSxJQUFJO1FBSEosVUFBSyxHQUFHLElBQUksQ0FBQztRQUl2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRVMsSUFBSSxVQUFVO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFYSxRQUFRLENBQUMsS0FBSztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUFkYTtJQUFYLFVBQVU7dUNBQWM7QUFPZjtJQUFULFFBQVE7MENBRVI7QUFFYTtJQUFiLE1BQU0sQ0FBQyxLQUFLO3dDQUVaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JzZXJ2YWJsZSwgYWN0aW9uLCBjb21wdXRlZCwgdG9KUyB9IGZyb20gJ21vYngnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVzdGlvbiB7XG4gIEBvYnNlcnZhYmxlIHZhbHVlID0gbnVsbDtcbiAganNvbjtcblxuICBjb25zdHJ1Y3Rvcihqc29uKSB7XG4gICAgdGhpcy5qc29uID0ganNvbjtcbiAgfVxuXG4gIEBjb21wdXRlZCBnZXQgcGxhaW5WYWx1ZSgpIHtcbiAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIEBhY3Rpb24uYm91bmQgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cbiJdfQ==