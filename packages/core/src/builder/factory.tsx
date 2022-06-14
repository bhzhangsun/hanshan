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
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  Button,
  Table,
  Layout,
  Row,
  Col,
  Form,
  Space
} from 'ant-design-vue';
_factory.register('input', Input);
_factory.register('input-textarea', Input.TextArea);
_factory.register('input-search', Input.Search);
_factory.register('input-group', Input.Group);
_factory.register('input-password', Input.Password);
_factory.register('input-number', InputNumber);
_factory.register('radio', Radio);
_factory.register('radio-group', Radio.Group);
_factory.register('checkbox', Checkbox);
_factory.register('checkbox-group', Checkbox.Group);
_factory.register('select', Select);
_factory.register('select-option', Select.Option);
_factory.register('data-picker', DatePicker);
_factory.register('month-picker', DatePicker.MonthPicker);
_factory.register('week-picker', DatePicker.WeekPicker);
_factory.register('range-picker', DatePicker.RangePicker);

_factory.register('form', Form);
_factory.register('form-item', Form.Item);

_factory.register('button', props => <Button {...props}>{props.label}</Button>);

_factory.register('table', Table);
_factory.register('table-column', Table.Column);
_factory.register('table-column-group', Table.ColumnGroup);

_factory.register('page', Layout);

_factory.register('row', Row);
_factory.register('col', Col);
_factory.register('space', Space);
