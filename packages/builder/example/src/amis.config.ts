const sample = {
  type: 'page',
  data: { name: 'a' },
  body: [
    {
      label: 'Name',
      type: 'input-text',
      name: 'name'
    },
    {
      type: 'container',
      body: 'name: ${name}'
    }
  ]
};

const dataSample = {
  type: 'page',
  data: {
    name: 'zhangsan'
  },
  body: [
    {
      type: 'tpl',
      tpl: 'my name is ${name}'
    },
    {
      type: 'service',
      data: {
        name: 'lisi'
      },
      body: [
        {
          type: 'container',
          body: { type: 'input-text', name: 'age' }
        }
      ]
    },
    {
      type: 'tpl',
      tpl: "my name is ${name}, I'm ${age} years old"
    }
  ]
};

const a_string = {
  type: 'page',
  body: "Hello, I'm AMis"
};

const a_input = {
  type: 'page',
  data: {
    foo: 'er'
  },
  body: {
    type: 'form',
    body: [
      {
        type: 'input-text',
        name: 'foo'
      },
      {
        type: 'tpl',
        body: 'foo: ${foo}'
      }
    ]
  }
};

export { a_string, a_input, sample, dataSample };
