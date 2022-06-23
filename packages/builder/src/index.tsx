import { Component } from 'vue';
import { factory } from './factory';
import { useExpression, useStates } from './states';

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
  show?: string;
  space?: any;
  data?: string;
  body?: CommonSchemaType;
  action?: ActionSchema;
  key?: number;
}

function _createComponent(config: CommonSchemaType): ComponentType | null {
  // 检查数组
  if (config instanceof Array) {
    const children = config.map((item, idx) => {
      return _createComponent({ ...item, key: idx });
    });
    return children;
  }
  // 结点可用性
  if (!config.type) return null;
  const comp = factory.get(config.type);
  if (!comp) return null;
  const showExpr = useExpression(config.show as string);
  if (!showExpr()) return null;
  // 生成子节点
  let children: any = null;
  if (config.body) {
    children = _createComponent(config.body);
    if (children instanceof Array && config.space) {
      const space = factory.get('space');
      console.log('space:', space);
      const props = config.space === true ? {} : config.space;
      children = <space {...props}>{children}</space>;
    }
  }

  // 处理状态绑定
  const [state, setState] = config.data ? useStates(config.data) : [];

  return (
    <comp
      {...config.props}
      {...{ key: config?.key, value: state }}
      onInput={(e: any) => {
        setState(e.target.value);
      }}
    >
      {children}
    </comp>
  );
}
export default function builder(config: any): Component | null {
  const root = _createComponent(config);
  if (root instanceof Array) {
    return <div>{root}</div>;
  }
  return root;
}
