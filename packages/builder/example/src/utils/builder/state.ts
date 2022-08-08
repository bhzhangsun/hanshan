import { computed, reactive } from 'vue';
import { useStates } from './_states';

type T = { [key: string | symbol]: any };

export class State {
  __$parent: State | null;
  __$data: any;
  [key: string | symbol]: any;

  constructor(parent: State | null, initVal: T) {
    this.__$parent = parent;
    this.__$data = reactive<T>({ ...initVal });
  }
}

export function findState(name: string, state: State | null, entry: boolean = true): State | null {
  if (!state) {
    return null;
  }
  if (state.__$data[name] !== undefined) {
    return state;
  } else {
    const st = findState(name, state.__$parent, false);
    if (st === null && entry) {
      state.__$data[name] = null;
      return state;
    } else {
      return st;
    }
  }
}

export function useExpression(expr: string, state: State) {
  const parts = expr.split(/(\$\{.*?\})/);
  // name: 'name'  // input组件
  // ${file}
  // ${resp.data}
  //   ${resp.data =""} TODO
  //   ${resp.data === v1} TODO

  const compiled = parts.map(str => {
    if (str.startsWith('${') && str.endsWith('}')) {
      const subExpr = str.slice(2, -1).trim();
      const _st = findState(subExpr, state);
      return { data: _st?.__$data, name: subExpr };
    }
    return str;
  });

  const exprValue = computed(() => {
    return compiled
      .map(item => {
        if (typeof item == 'object') {
          console.log('exprValue:', item);
          return item.data[item.name];
        } else {
          return item;
        }
      })
      .join('');
  });
  return exprValue;
  // patt.exec(str)
}
