const fs = require('fs');
const { deepEqual } = require('assert');
require('../build/linter');

const filename = 'text-sizes-should-be-equal';
const code = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';
const error = 'Текст не является эталонным.';

const json = fs.readFileSync(`${__dirname}/jsons/warning/${filename}.json`, 'utf8');
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
    deepEqual(lint(json), expected);
  });
});
