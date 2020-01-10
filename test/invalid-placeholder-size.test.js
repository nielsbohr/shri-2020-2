const { expect } = require('chai');
require('../build/linter');

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
                  },
                  {
                      "block": "placeholder"
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
                  },
                  {
                      "block": "placeholder"
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
                  },
                  {
                      "block": "placeholder"
                  }
              ]
          }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'Placeholder L size',
  },
];


describe(code, () => {
  data.forEach((testCase) => {
    it(testCase.message, () => {
      const errors = global.lint(testCase.json);
      expect(errors).to.deep.include.members(testCase.expected);
      expect(errors).to.have.length(testCase.length);
    });
  });
});
