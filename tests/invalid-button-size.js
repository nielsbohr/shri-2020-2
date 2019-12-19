const fs = require('fs');
const { deepEqual } = require('assert');
// const { lint } = require('../core/lint');
require('../build/linter');

const json = fs.readFileSync(`${__dirname}/jsons/warning/invalid-button-size.json`, 'utf8');
const expected = [
  {
    code: 'WARNING.INVALID_BUTTON_SIZE',
    error: 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного.',
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

describe('INVALID_BUTTON_SIZE', () => {
  it('Возвращает кнопки размера не больше эталонного на один', () => {
    deepEqual(lint(json), expected);
  });
});
