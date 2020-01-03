const fs = require('fs');
const { deepEqual } = require('assert');
require('../build/linter');

const filename = 'invalid-button-position';
const code = 'WARNING.INVALID_BUTTON_POSITION';
const error = 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.';

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
  {
    code,
    error,
    location: {
      end: {
        column: 26,
        line: 27,
      },
      start: {
        column: 25,
        line: 22,
      },
    },
  },
];

describe(code, () => {
  it(error, () => {
    deepEqual(lint(json), expected);
  });
});
