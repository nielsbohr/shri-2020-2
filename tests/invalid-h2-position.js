const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../index');


const json = fs.readFileSync(`${__dirname}/jsons/text/invalid-h2-position.json`, 'utf8');
const expected = [
  {
    code: 'TEXT.INVALID_H2_POSITION',
    error: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.',
    location: {
      end: {
        column: 18,
        line: 34,
      },
      start: {
        column: 17,
        line: 26,
      },
    },
  },
];


describe('TEXT.INVALID_H2_POSITION', () => {
  it('Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.', () => {
    deepEqual(lint(json), expected);
  });
});
