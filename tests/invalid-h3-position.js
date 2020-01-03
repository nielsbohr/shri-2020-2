const fs = require('fs');
const { deepEqual } = require('assert');
require('../build/linter');

const filename = 'invalid-h3-position';
const code = 'TEXT.INVALID_H3_POSITION';
const error = 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.';

const json = fs.readFileSync(`${__dirname}/jsons/text/${filename}.json`, 'utf8');
const expected = [
  {
    code,
    error,
    location: {
      end: {
        column: 18,
        line: 16,
      },
      start: {
        column: 17,
        line: 8,
      },
    },
  },
];


describe(code, () => {
  it(error, () => {
    deepEqual(lint(json), expected);
  });
});
