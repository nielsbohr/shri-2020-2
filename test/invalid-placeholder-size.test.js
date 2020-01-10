const code = 'WARNING.INVALID_PLACEHOLDER_SIZE';
const error = 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.';

const data = [
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                      "block": "placeholder",
                      "mods": {
                          "size": "xs"
                      }
                  },
                  {
                      "block": "placeholder"
                  }
              ]
          }
      ]
  }`,
    expected: [
      {
        code,
        error,
        location: {
          end: {
            column: 20,
            line: 12,
          },
          start: {
            column: 19,
            line: 7,
          },
        },
      },
    ],
    length: 1,
    message: 'Placeholder incorrect size',
  },
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                      "block": "placeholder",
                      "mods": {
                          "size": "m"
                      }
                  }
              ]
          }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'Placeholder M size',
  },
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                      "block": "placeholder",
                      "mods": {
                          "size": "s"
                      }
                  }
              ]
          }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'Placeholder S size',
  },
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                      "block": "placeholder",
                      "mods": {
                          "size": "l"
                      }
                  }
              ]
          }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'Placeholder L size',
  },
  {
    json: `{
      "block": "warning",
      "content": [
          {
              "block": "placeholder"
          }
      ]     
  }`,
    expected: [],
    length: 0,
    message: 'Placeholder without size',
  },
  {
    json: `{
      "block": "payment",
      "content": [
          {
            "block": "placeholder",
            "mods": {
              "size": "xs"
            }
          }
      ]     
  }`,
    expected: [],
    length: 0,
    message: 'Incorrect placeholder, but parent is not warning',
  },
];

module.exports = {
  code,
  error,
  data,
};
