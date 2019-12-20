const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../index');

const filename = 'several-h1';
const code = 'TEXT.SEVERAL_H1';
const error = 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.';

const json = fs.readFileSync(`${__dirname}/jsons/text/${filename}.json`, 'utf8');
const expected = [
  {
    code,
    error,
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
    code,
    error,
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


describe(code, () => {
  it(error, () => {
    deepEqual(lint(json), expected);
  });
});
