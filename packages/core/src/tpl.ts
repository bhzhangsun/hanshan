export function execute(tpl: string, _ctx?: unknown): unknown {
  return eval(tpl);
}
