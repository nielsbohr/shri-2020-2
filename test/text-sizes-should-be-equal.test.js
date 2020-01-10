const { expect } = require('chai');
require('../build/linter');

const code = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';
const error = 'Блок Warning содержит тексты разных размеров.';

const data = [
  {
    json: `{
      "block": "warning",
      "content": [
          {
              "block": "text",
              "mods": {
                  "size": "xxl"
              }
          },
          {
              "block": "text",
              "mods": {
                  "size": "xxl"
              }
          },
          {
              "block": "text",
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
            column: 4,
            line: 23,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ],
    length: 1,
    message: 'Fail. Wrong text',
  },
  {
    json: `{
      "block": "warning",
      "content": [
          {
              "block": "text",
              "mods": {
                  "size": "xxl"
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
                      "block": "text",
                      "mods": {
                          "size": "xl"
                      }
                  }
              ]
          },
          {
              "block": "text",
              "mods": {
                  "size": "xxl"
              }
          },
          {
              "block": "text",
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
            column: 4,
            line: 40,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
      {
        code,
        error,
        location: {
          end: {
            column: 12,
            line: 26,
          },
          start: {
            column: 11,
            line: 10,
          },
        },
      },
    ],
    length: 2,
    message: 'wrong warning with nested wrong warning',
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
                  }
              ]
          },
          {
              "block": "text",
              "mods": {
                  "size": "l"
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
            line: 26,
          },
          start: {
            column: 11,
            line: 10,
          },
        },
      },
    ],
    length: 1,
    message: 'wrong warning inside correct warning',
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
                          "size": "l"
                      }
                  }
              ]
          },
          {
              "block": "text",
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
            column: 4,
            line: 34,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ],
    length: 1,
    message: 'correct warning inside wrong warning',
  },
  {
    json: `{
      "block": "warning",
      "content": [
          {
              "block": "text",
              "mods": {
                  "size": "m"
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
                      "block": "text",
                      "mods": {
                          "size": "l"
                      }
                  }
              ]
          },
          {
              "block": "text",
              "mods": {
                  "size": "m"
              }
          }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'correct warning inside correct warning',
  },
  {
    json: `{
      "block": "warning",
      "content": [
          {
              "block": "text",
              "mods": {
                  "size": "m"
              }
          },
          {
              "block": "text",
              "mods": {
                  "size": "m"
              }
          }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'correct warning',
  },
  {
    json: `{
      "block": "warning",
      "content": [
          {
              "block": "text",
              "mods": {
                  "size": "m"
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
                      "block": "text",
                      "mods": {
                          "size": "l"
                      }
                  }
              ]
          },
          {
            "block": "button",
            "mods": {
                "size": "l"
            }
          },
          {
              "block": "text",
              "mods": {
                  "size": "m"
              }
          }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'correct warning with element(button) another size',
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
