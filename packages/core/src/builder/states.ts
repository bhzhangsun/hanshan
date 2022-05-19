import { reactive } from 'vue';

class States {
  private _root: { [key: string]: any } = reactive({});

  public append(name: string, initValue?: any) {
    const other = reactive({ [name]: initValue });
    Object.assign(this._root, other);
  }

  public remove(name: string) {
    delete this._root[name];
  }

  public get(name: string) {
    return this._root[name];
  }

  public set(name: string, value: any) {
    const other = reactive({ [name]: value });
    Object.assign(this._root, other);
  }

  public parse(express: string): () => any {
    const { _root } = this;

    const func = function (): any {
      const __$states = _root;
      let opts: string[] = [];
      for (const key in __$states) {
        if (Object.prototype.hasOwnProperty.call(__$states, key)) {
          opts.push(key);
        }
      }
      opts.sort((a, b) => b.length - a.length);
      const pattern = new RegExp(`\\$(${opts.join('|')})`, 'g');

      const expr = express.replaceAll(pattern, "__$states['$1']");
      const tpl = `(function(){console.log('data:', __$states); return (${expr});})()`;
      console.log('tpl:', pattern, tpl, express);
      let result = null;
      try {
        result = eval(tpl);
      } catch (error) {
        console.error('表达式解析失败！', error);
      }
      return result;
    };
    return func;
  }
}

const _states = new States();
export function useStates(name: string, initValue?: any, cover?: boolean) {
  if (cover || !_states.get(name)) {
    _states.append(name, initValue);
  }
  if (_states.get(name) && initValue != undefined && !cover) {
    console.error(`已有${name}状态，请检查，或使用cover参数强制覆盖！`);
  }
  return [_states.get(name), (value: any) => _states.set(name, value)];
}

export function useExpression(express?: string): () => any {
  if (express === undefined) return () => true;
  return express ? _states.parse(express) : () => false;
}
