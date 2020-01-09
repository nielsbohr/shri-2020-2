const { expect } = require('chai');
require('../build/linter');

const code = 'WARNING.INVALID_BUTTON_SIZE';
const error = 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного.';

const data = [
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                    "block": "text",
                    "mods": {
                        "size": "l"
                    }
                  },
                  {
                      "block": "button",
                      "mods": {
                          "size": "s"
                      }
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
            line: 18,
          },
          start: {
            column: 19,
            line: 13,
          },
        },
      },
    ],
    length: 1,
    message: 'ошибка. текст до кнопки',
  }, {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                      "block": "button",
                      "mods": {
                          "size": "s"
                      }
                  },
                  {
                      "block": "text",
                      "mods": {
                          "size": "l"
                      }
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
    message: 'ошибка. текст после кнопки',
  }, {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                    "block": "text",
                    "mods": {
                        "size": "l"
                    }
                  },
                  {
                    "block": "text",
                    "mods": {
                        "size": "xl"
                    }
                  },
                  {
                      "block": "button",
                      "mods": {
                          "size": "xl"
                      }
                  }
              ]
          }
      ]
    }`,
    expected: [],
    length: 1,
    message: 'Не ошибка. Два текста перед кнопкой',
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
