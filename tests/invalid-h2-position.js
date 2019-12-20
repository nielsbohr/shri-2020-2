const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../index');

const filename = 'invalid-h2-position';
const code = 'TEXT.INVALID_H2_POSITION';
const error = 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.';

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
