import { builder } from '../src';

describe('@hanshan/builder', () => {
  test('needs tests', () => {
    const vnode = builder({
      type: 'page',
      body: 'hello world'
    });
    console.log('vnode:', vnode);
    expect(1).toBeTruthy();
  });
});
