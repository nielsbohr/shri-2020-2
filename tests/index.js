const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../index');


const json = fs.readFileSync(`${__dirname}/jsons/index.json`, 'utf8');
const expected = [
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
