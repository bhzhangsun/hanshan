import { State } from '../utils/builder/__state';

export function testFunction() {
  const a = new State(
    {
      key1: 'testa',
      arr2: [1, 2],
      obj3: {
        test: 1
      }
    },
    null
  );
  const b = new State(
    {
      key1: 'testb',
      arr3: ['01', '02'],
      obj4: {
        aa: 'hahaha'
      }
    },
    a
  );

  const c = new State({}, b);
  const d = new State({}, b);

  console.log('-------get test------', c.key1, c['arr2'], c.arr3);
  console.log('-------set test------', (c.key1 = 'set hello'), (c['arr3'] = []));

  console.log('-------add prop test------', (c.add1 = 'hello1'), (b.add2 = 'hello2'));

  console.log('-------delete prop test------', delete c.add1, c, delete b['add2'], b);

  console.log('-------in test------', 'add1' in c == false, 'arr3' in c == true, 'arr3' in a == false);

  console.log(
    '-------keys test------',
    Object.keys(c).join(','),
    Object.getOwnPropertyNames(b).join(','),
    Object.getOwnPropertySymbols(b).join(','),
    Reflect.ownKeys(b)
  );
}
