const { expect } = require('chai');
require('../build/linter');

const code = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
const error = 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.';

const json = `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "offer"
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
        column: 2,
        line: 32,
      },
      start: {
        column: 1,
        line: 1,
      },
    },
  },
];


describe(code, () => {
  it(error, () => {
    expect(global.lint(json)).to.deep.include.members(expected);
  });
});
