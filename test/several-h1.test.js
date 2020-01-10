const { expect } = require('chai');
require('../build/linter');

const code = 'TEXT.SEVERAL_H1';
const error = 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.';

const data = [
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "text",
              "mods": {
                  "view": "primary",
                  "size": "l",
                  "type": "h1",
                  "align": "center"
              }
          },
          {
              "block": "text",
              "mods": {
                  "view": "primary",
                  "size": "l",
                  "type": "h1",
                  "align": "center"
              }
          },
          {
              "block": "text",
              "mods": {
                  "view": "primary",
                  "size": "l",
                  "type": "h1",
                  "align": "center"
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
            line: 21,
          },
          start: {
            column: 11,
            line: 13,
          },
        },
      },
      {
        code,
        error,
        location: {
          end: {
            column: 12,
            line: 30,
          },
          start: {
            column: 11,
            line: 22,
          },
        },
      },
    ],
    length: 2,
    message: 'H1, H1, H1',
  },
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "text",
              "mods": {
                  "view": "primary",
                  "size": "l",
                  "type": "h1",
                  "align": "center"
              }
          }
     ]
    }`,
    expected: [],
    length: 0,
    message: 'Only one H1',
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
