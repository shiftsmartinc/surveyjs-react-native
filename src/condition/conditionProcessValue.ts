import { HashTable, Helpers } from './helpers';

export class ProcessValue {
  public values: HashTable<any> = null;
  public properties: HashTable<any> = null;
  constructor() {}
  public getFirstName(text: string): string {
    if (!text) return text;
    var res = '';
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ch == '.' || ch == '[') break;
      res += ch;
    }
    return res;
  }
  public hasValue(text: string, values: HashTable<any> = null): boolean {
    if (!values) values = this.values;
    var res = this.getValueCore(text, values);
    return res.hasValue;
  }
  public getValue(text: string, values: HashTable<any> = null): any {
    if (!values) values = this.values;
    var res = this.getValueCore(text, values);
    return res.value;
  }
  public getValueInfo(valueInfo: any) {
    if (!!valueInfo.path) {
      valueInfo.value = this.getValueFromPath(valueInfo.path, this.values);
      valueInfo.hasValue =
        valueInfo.value !== null && !Helpers.isValueEmpty(valueInfo.value);
      if (
        !valueInfo.hasValue &&
        valueInfo.path.length > 1 &&
        valueInfo.path[valueInfo.path.length - 1] == 'length'
      ) {
        valueInfo.hasValue = true;
        valueInfo.value = 0;
      }
      return;
    }
    var res = this.getValueCore(valueInfo.name, this.values);
    valueInfo.value = res.value;
    valueInfo.hasValue = res.hasValue;
    valueInfo.path = res.hasValue ? res.path : null;
  }
  private getValueFromPath(path: Array<string | number>, values: any): any {
    var index = 0;
    while (!!values && index < path.length) {
      var ind_name = path[index];
      if (
        Helpers.isNumber(ind_name) &&
        Array.isArray(values) &&
        ind_name >= values.length
      )
        return null;
      values = values[ind_name];
      index++;
    }
    return values;
  }
  private getValueCore(text: string, values: any): any {
    var res = { hasValue: false, value: null };
    var curValue = values;
    if (!curValue) return res;
    var isFirst = true;
    while (text && text.length > 0) {
      var isArray = !isFirst && text[0] == '[';
      if (!isArray) {
        if (!isFirst) text = text.substr(1);
        var curName = this.getFirstName(text);
        if (!curName) return res;
        if (!curValue[curName]) return res;
        curValue = curValue[curName];
        text = text.substr(curName.length);
      } else {
        if (!Array.isArray(curValue)) return res;
        var index = 1;
        var str = '';
        while (index < text.length && text[index] != ']') {
          str += text[index];
          index++;
        }
        text = index < text.length ? text.substr(index + 1) : '';
        index = this.getIntValue(str);
        if (index < 0 || index >= curValue.length) return res;
        curValue = curValue[index];
      }
      isFirst = false;
    }
    res.value = curValue;
    res.hasValue = true;
    return res;
  }
  private getIntValue(str: any) {
    if (str == '0' || ((str | 0) > 0 && str % 1 == 0)) return Number(str);
    return -1;
  }
}
