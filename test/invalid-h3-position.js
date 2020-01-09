const { expect } = require('chai');
require('../build/linter');

const code = 'TEXT.INVALID_H3_POSITION';
const error = 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.';

const data = [
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "text",
              "mods": {
                  "type": "h3"
              }
          },
          {
              "block": "text",
              "mods": {
                  "type": "h2"
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
            column: 12,
            line: 9,
          },
          start: {
            column: 11,
            line: 4,
          },
        },
      },
    ],
    length: 1,
    message: 'Типичная ошибка',
  },
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "text",
              "mods": {
                  "type": "h3"
              }
          },
          {
              "block": "text",
              "mods": {
                  "type": "h2"
              }
          },
          {
            "block": "text",
            "mods": {
                "type": "h3"
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
            column: 12,
            line: 9,
          },
          start: {
            column: 11,
            line: 4,
          },
        },
      },
    ],
    length: 1,
    message: 'ошибка + h3 после h2',
  },
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "text",
              "mods": {
                  "type": "h2"
              }
          },
          {
            "block": "text",
            "mods": {
                "type": "h3"
            }
        },
        {
          "block": "text",
          "mods": {
              "type": "h3"
          }
        }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'Без ошибок',
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
