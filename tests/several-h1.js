const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../index');


const json = fs.readFileSync(`${__dirname}/jsons/text/several-h1.json`, 'utf8');
const expected = [
  {
    code: 'TEXT.SEVERAL_H1',
    error: 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.',
    location: {
      end: {
        column: 10,
        line: 21,
      },
      start: {
        column: 9,
        line: 13,
      },
    },
  },
  {
    code: 'TEXT.SEVERAL_H1',
    error: 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.',
    location: {
      end: {
        column: 10,
        line: 30,
      },
      start: {
        column: 9,
        line: 22,
      },
    },
  },
];


describe('Заголовок первого уровня', () => {
  it('Возвращает ошибочные h1', () => {
    deepEqual(lint(json), expected);
  });
});
