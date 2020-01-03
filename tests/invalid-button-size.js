const fs = require('fs');
const { deepEqual } = require('assert');
require('../build/linter');

const filename = 'invalid-button-size';
const code = 'WARNING.INVALID_BUTTON_SIZE';
const error = 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного.';

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
