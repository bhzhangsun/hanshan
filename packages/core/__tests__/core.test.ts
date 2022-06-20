import { execute } from '../src/index';

describe('@hanshan/core', () => {
  it('template', () => {
    const expr = '';
    expect(execute(expr)).toEqual(3);
  });
});
