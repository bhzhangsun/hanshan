import { reactive } from 'vue';

type T = { [key: string | symbol]: any };

class RawState {
  __$parent: RawState | null;
  __$data: any;

  [key: string | symbol]: any;
  constructor(initVal: T, parent: RawState | null = null) {
    this.__$parent = parent;
    this.__$data = reactive<T>(initVal);
  }
}

// 需要对state对象劫持的操作
// defineProperty 对当前对象添加属性  assign等操作
// deleteProperty 对当前对象删除属性
// get
// set 回溯查找所有父，
// has： 拦截 in操作符
// ownKeys() 拦截keys等

const handlers = {
  defineProperty(target: RawState, prop: string | symbol, desc: PropertyDescriptor): boolean {
    return Reflect.defineProperty(target.__$data, prop, {
      ...desc,
      enumerable: true
    });
  },
  deleteProperty(target: RawState, prop: string | symbol): boolean {
    return Reflect.deleteProperty(target.__$data, prop);
  },
  get(target: RawState, prop: string | symbol): any {
    if (prop in target.__$data) {
      return target.__$data[prop];
    }
    if (target.__$parent !== null) {
      return target.__$parent[prop];
    }

    return undefined;
  },
  set(target: RawState, prop: string | symbol, value: any): boolean {
    if (target.__$parent && prop in target.__$parent) {
      // 向上查找
      target.__$parent[prop] = value;
      return true;
    }

    // __$data 对象存在属性赋值，否则定义该属性
    target.__$data[prop] = value;
    return true;
  },
  has(target: RawState, key: string | symbol): boolean {
    if (key in target.__$data) {
      return true;
    }

    if (target.__$parent !== null) {
      return key in target.__$parent;
    }

    return false;
  },
  ownKeys(target: RawState) {
    const keys = Object.keys(target.__$data);
    const pKeys = target.__$parent !== null ? Reflect.ownKeys(target.__$parent) : [];

    const temp = Array.from(new Set([...keys, ...pKeys]));
    console.log('ownKeys:', temp);
    return temp;
  }
};

const State = new Proxy(RawState, {
  construct(ctor, args) {
    const [initVal, parent] = args as [T, RawState | null];
    const o: RawState = new ctor(initVal, parent);
    return new Proxy(o, handlers);
  }
});

export { State };
