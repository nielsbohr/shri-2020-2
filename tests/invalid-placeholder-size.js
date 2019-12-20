const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../index');

const json = fs.readFileSync(`${__dirname}/jsons/warning/invalid-placeholder-size.json`, 'utf8');
const expected = [
  {
    code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
    error: 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.',
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

describe('WARNING.INVALID_PLACEHOLDER_SIZE', () => {
  it('Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.', () => {
    deepEqual(lint(json), expected);
  });
});
