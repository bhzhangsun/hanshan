import { Component } from 'vue';

class Factory {
  private _internel: { [key: string]: Component } = {};

  public register(type: string, comp: Component, cover?: boolean): boolean {
    if (this._internel[type] && !cover) {
      console.error('注册组件失败！组件名与已有组件冲突，请检查，或者强制使用请添加 cover参数');
      return false;
    }
    this._internel[type] = comp;
    return true;
  }

  public get(type: string): Component | null {
    const comp = this._internel[type];
    if (!comp) {
      console.error('没有这个组件！', type);
      return null;
    }

    return comp;
  }
}

const _factory = new Factory();
export { _factory as factory };

/**
 * desp: 注册常用组件
 */
import {
  ElInput,
  ElInputNumber,
  ElRadio,
  ElCheckbox,
  ElSelect,
  ElDatePicker,
  ElButton,
  ElTable,
  ElRow,
  ElCol,
  ElForm,
  ElSpace
} from 'element-plus';
_factory.register('input', ElInput);
_factory.register('input-textarea', ElInput.TextArea);
_factory.register('input-search', ElInput.Search);
_factory.register('input-group', ElInput.Group);
_factory.register('input-password', ElInput.Password);
_factory.register('input-number', ElInputNumber);
_factory.register('radio', ElRadio);
_factory.register('radio-group', ElRadio.Group);
_factory.register('checkbox', ElCheckbox);
_factory.register('checkbox-group', ElCheckbox.Group);
_factory.register('select', ElSelect);
_factory.register('select-option', ElSelect.Option);
_factory.register('data-picker', ElDatePicker);
_factory.register('month-picker', ElDatePicker.MonthPicker);
_factory.register('week-picker', ElDatePicker.WeekPicker);
_factory.register('range-picker', ElDatePicker.RangePicker);

_factory.register('form', ElForm);
_factory.register('form-item', ElForm.Item);

_factory.register('button', props => <ElButton {...props}>{props.label}</ElButton>);

_factory.register('table', ElTable);
_factory.register('table-column', ElTable.Column);
_factory.register('table-column-group', ElTable.ColumnGroup);

_factory.register('row', ElRow);
_factory.register('col', ElCol);
_factory.register('space', ElSpace);
