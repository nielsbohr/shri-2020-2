const fs = require('fs');
const { deepEqual } = require('assert');
require('../build/linter');

const filename = 'invalid-placeholder-size';
const code = 'WARNING.INVALID_PLACEHOLDER_SIZE';
const error = 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.';

const json = fs.readFileSync(`${__dirname}/jsons/warning/${filename}.json`, 'utf8');
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
    deepEqual(lint(json), expected);
  });
});
