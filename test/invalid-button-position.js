const { expect } = require('chai');
require('../build/linter');

const code = 'WARNING.INVALID_BUTTON_POSITION';
const error = 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.';

const data = [
  {
    json: `{
    "block": "warning",
    "content": [
        {
            "block": "button",
            "mods": {
                "size": "xl"
            }
        },
        {
            "block": "warning",
            "content": [
                {
                    "block": "button",
                    "mods": {
                        "size": "xl"
                    }
                },
                {
                    "block": "placeholder",
                    "mods": {
                        "size": "m"
                    }
                }
            ]
        },
        {
            "block": "text",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "placeholder",
            "mods": {
                "size": "m"
            }
        },
        {
            "block": "button",
            "mods": {
                "size": "xl"
            }
        }
    ]
}`,
    expected: [
      {
        code,
        error,
        location: {
          end: {
            column: 10,
            line: 9,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
      {
        code,
        error,
        location: {
          end: {
            column: 18,
            line: 18,
          },
          start: {
            column: 17,
            line: 13,
          },
        },
      },
    ],
    length: 2,
    message: 'warning вложенный в warning',
  },
  {
    json: `{
    "block": "warning",
    "content": [
        {
            "block": "button",
            "mods": {
                "size": "xl"
            }
        },
        {
            "block": "text",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "placeholder",
            "mods": {
                "size": "m"
            }
        },
        {
            "block": "button",
            "mods": {
                "size": "xl"
            }
        }
    ]
}`,
    expected: [
      {
        code,
        error,
        location: {
          end: {
            column: 10,
            line: 9,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
    ],
    length: 1,
    message: '1 button впереди placeholder',
  },
  {
    json: `{
    "block": "warning",
    "content": [
        {
            "block": "text",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "placeholder",
            "mods": {
                "size": "m"
            }
        },
        {
          "block": "button",
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
}`,
    expected: [],
    length: 0,
    message: 'без ошибок',
  },
  {
    json: `{
    "block": "payment",
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
              "size": "xl"
          }
        },
        {
            "block": "placeholder",
            "mods": {
                "size": "m"
            }
        },
        {
            "block": "button",
            "mods": {
                "size": "xl"
            }
        }
    ]
}`,
    expected: [],
    length: 0,
    message: 'блок не warning',
  },
  {
    json: `{
      "block": "page",
      "content": [
        {
          "block": "button",
          "mods": {
              "size": "xl"
          }
        },
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
                  "size": "xl"
              }
            },
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
    expected: [
      {
        code,
        error,
        location: {
          end: {
            column: 14,
            line: 24,
          },
          start: {
            column: 13,
            line: 19,
          },
        },
      },
    ],
    length: 1,
    message: 'button вне warning + ошибочный button',
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
