// 模板解析需要解析json中的常见表达式。
// 字符串差值 '这是{{data.name}}'
// 支持filter语法 '{{data.date | date}}'
// showOn: {{data1.test == 'close'}}; 运算符解析
// ${obj[key]} key也是状态

export function compile(expr: string, ctx: any = {}) {
  const express = expr;
  const __$states = ctx;
  const func = function (): any {
    // 使用ctx内的属性匹配，限制作用域
    let opts: string[] = [];
    for (const key in __$states) {
      if (Object.prototype.hasOwnProperty.call(__$states, key)) {
        opts.push(key);
      }
    }
    opts.sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`\\$\\{\\ *(${opts.join('|')})(\\|[A-Za-z_]\w*)*\\}`, 'g');

    console.log('pattern:', pattern, express);
    const expr = express.replaceAll(pattern, "__$states['$1']$2");
    const tpl = `(function(){return (${expr});})()`;
    // console.log('tpl:', pattern, tpl, expr);
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

export function useExpression(express: string, ctx: any = {}): () => any {
  return compile(express, ctx);
}
