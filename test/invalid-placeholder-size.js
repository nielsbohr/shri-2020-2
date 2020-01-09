const { expect } = require('chai');
require('../build/linter');

const code = 'WARNING.INVALID_PLACEHOLDER_SIZE';
const error = 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.';

const json = `{
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
}`;

const expected = [
  {
    code,
    error,
    location: {
      end: {
        column: 18,
        line: 12,
      },
      start: {
        column: 17,
        line: 7,
      },
    },
  },
];

describe(code, () => {
  it(error, () => {
    expect(global.lint(json)).to.deep.include.members(expected);
  });
});
