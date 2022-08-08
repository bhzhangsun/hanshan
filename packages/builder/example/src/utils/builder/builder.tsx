import { Component } from 'vue';
import { ActionsFactory } from './action';
import { factory } from './factory';
import { State, findState, useExpression } from './state';

type CommonSchemaType = CommonSchema | CommonSchema[];
type ComponentType = Component | Component[];

export interface ActionSchema {
  // 链式action表达使用数组
  type: string;
  body?: CommonSchemaType;
  redirect: string;
}
export interface CommonSchema {
  type: string;
  props: any;
  onShow?: string;
  space?: any;
  data?: { [key: string]: any };
  body?: CommonSchemaType;
  action?: ActionSchema;
  key?: number;
  onEvent?: { [key: string]: any };
  api?: string;
}

function _createComponent(config: CommonSchemaType, parentState: State): ComponentType | null {
  console.log('comp config:', config);
  let st = parentState;

  // 检查数组
  if (config instanceof Array) {
    const children = config.map((item, idx) => {
      return _createComponent({ ...item, key: idx }, st);
    });
    return children;
  }

  // 结点可用性
  if (!config.type) return null;
  const comp = factory.get(config.type);
  if (!comp) return null;

  if (config.data) {
    st = new State(st, config.data);
  }
  const props = {
    ...config,
    findState: (name: string): any => {
      const _st = findState(name, st);
      return _st?.__$data;
      // if (_st !== null && _st.__$data[name] === null) {
      //   _st.__$data[name] = "";
      // }
      // return _st?.__$data[name];
    }
  };

  // 事件解析
  if (config.onEvent) {
    for (const key in config.onEvent) {
      const _configs = config.onEvent[key];
      const evName = 'on' + key[0].toUpperCase() + key.slice(1);
      const actions = _configs.map((c: any) => {
        const _func = ActionsFactory.get(c.actionType);
        console.log('event actions:', ActionsFactory._internel, _configs, _func);
        return async (ev: any) => _func && (await _func(c, ev));
      });
      props[evName] = async (ev: any) => {
        for (const act of actions) {
          await act();
        }
      };
    }
  }

  // const showExpr = useExpression(config.onShow as string);
  // if (!showExpr()) return null;
  // 生成子节点
  let children: any = null;
  if (config.body) {
    if (typeof config.body === 'string') {
      // children = config.body;
      const _ref = useExpression(config.body, st);
      console.log('ref.val:', _ref);
      children = () => _ref.value;
    } else {
      children = _createComponent(config.body, st);
    }
    if (children instanceof Array) {
      if (config.space) {
        const space = factory.get('space');
        console.log(space);
        children = <space {...props}>{children}</space>;
      } else {
        children = <>{children}</>;
      }
    }
  }

  return <comp {...props}>{children}</comp>;
}

function builder(config: any): Component | null {
  const st = new State(null, {});
  let root = _createComponent(config, st);
  console.log('root:', root);
  if (root instanceof Array) {
    root = <>{root}</>;
  }
  const _findState = (name: string): any => {
    const _st = findState(name, st);
    return _st?.__$data;
    // if (_st !== null && _st.__$data[name] === null) {
    //   _st.__$data[name] = "";
    // }
    // return _st?.__$data[name];
  };
  return <root findState={_findState}></root>;
}

export { builder };
