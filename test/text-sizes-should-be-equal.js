const { expect } = require('chai');
require('../build/linter');

const code = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';
const error = 'Текст не является эталонным.';

const json = `{
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
}`;
const expected = [
  {
    code,
    error,
    location: {
      end: {
        column: 10,
        line: 38,
      },
      start: {
        column: 9,
        line: 33,
      },
    },
  },
  {
    code,
    error,
    location: {
      end: {
        column: 18,
        line: 24,
      },
      start: {
        column: 17,
        line: 19,
      },
    },
  },
];

describe(code, () => {
  it(error, () => {
    expect(global.lint(json)).to.deep.include.members(expected);
  });
});
