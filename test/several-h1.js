const { expect } = require('chai');
require('../build/linter');

const code = 'TEXT.SEVERAL_H1';
const error = 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.';

const json = `{
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
}`;

const expected = [
  {
    code,
    error,
    location: {
      end: {
        column: 10,
        line: 21,
      },
      start: {
        column: 9,
        line: 13,
      },
    },
  },
  {
    code,
    error,
    location: {
      end: {
        column: 10,
        line: 30,
      },
      start: {
        column: 9,
        line: 22,
      },
    },
  },
];


describe(code, () => {
  it(error, () => {
    expect(global.lint(json)).to.deep.include.members(expected);
  });
});
