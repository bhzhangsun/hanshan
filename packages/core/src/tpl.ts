// 模板解析需要解析json中的常见表达式。
// 字符串差值 '这是${data.name}'
// 支持filter语法 '${data.date | date}'
// showOn: ${data.test} == 'close'; 运算符解析

import { compile } from './expression';
export function execute(tpl: string, _ctx?: unknown): unknown {
  const routine = compile(tpl, _ctx);
  return routine();
}
