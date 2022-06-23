import { execute } from '../src/index';

describe('@hanshan/core', () => {
  it('template', () => {
    expect(execute('false')).toEqual(false);
    expect(execute('window')).toBeFalsy();
    expect(execute('global')).toBeTruthy();
    expect(execute('${foo.text}', { foo: { text: 'hello world' } })).toEqual('hello world');
    expect(execute('${ foo.text }', { foo: { text: 'hello world' } })).toEqual('hello world');
    expect(execute('${ foo.text }', { foo: { text: 'hello world' } })).toEqual('hello world');
  });
});
