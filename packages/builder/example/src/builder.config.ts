const dataSample = {
  type: 'container',
  space: true,
  body: [
    {
      type: 'container',
      data: {
        text: '22222222'
      },
      body: [
        {
          type: 'input',
          props: {
            name: 'text'
          }
        },
        { type: 'container', body: 'text:${text}' },
        {
          type: 'button',
          onShow: 'true',
          props: {
            label: 'Aello'
          },
          onEvent: {
            click: [
              {
                actionType: 'alert',
                body: '${text}'
              }
            ]
          }
        }
      ]
    }
  ]
};

const b_string = {
  type: 'container',
  body: "Hello, I'm Builder"
};

const b_input = {
  type: 'container',
  data: {
    foo: 'hello'
  },
  body: [
    {
      type: 'input',
      name: 'foo'
    },
    {
      type: 'container',
      body: 'foo:${foo}',
      width: '100px'
    }
  ]
};
export { b_string, b_input, dataSample };
