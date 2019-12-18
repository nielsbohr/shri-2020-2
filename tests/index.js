const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../index');


const json = fs.readFileSync(`${__dirname}/jsons/index.json`, 'utf8');
const expected = [
  {
    code: 'TEXT.SEVERAL_H1',
    error: 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.',
    location: {
      end: {
        column: 58,
        line: 276,
      },
      start: {
        column: 57,
        line: 268,
      },
    },
  },
  {
    code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
    error: 'Текст не является эталонным.',
    location: {
      start: {
        column: 49,
        line: 94,
      },
      end: {
        column: 50,
        line: 284,
      },
    },
  },
];


describe('text sizes should be equal', () => {
  it('should return WARNING block', () => {
    deepEqual(lint(json), expected);
  });
});
