const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../index');


const json = fs.readFileSync(`${__dirname}/jsons/text/invalid-h3-position.json`, 'utf8');
const expected = [
  {
    code: 'TEXT.INVALID_H3_POSITION',
    error: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.',
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


describe('TEXT.INVALID_H3_POSITION', () => {
  it('Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.', () => {
    deepEqual(lint(json), expected);
  });
});
