const fs = require('fs');
const { deepEqual } = require('assert');
require('../build/linter');

const filename = 'too-much-marketing-blocks';
const code = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
const error = 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.';

const json = fs.readFileSync(`${__dirname}/jsons/grid/${filename}.json`, 'utf8');
const expected = [
  {
    code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
    error: 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.',
    location: {
      end: {
        column: 2,
        line: 32,
      },
      start: {
        column: 1,
        line: 1,
      },
    },
  },
];


describe(code, () => {
  it(error, () => {
    deepEqual(lint(json), expected);
  });
});
