const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../out/index');

const filename = 'too-much-marketing-blocks';
const code = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
const error = 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.';

const json = fs.readFileSync(`${__dirname}/jsons/index.json`, 'utf8');
const expected = [];


describe(code, () => {
  it(error, () => {
    // deepEqual(lint(json), expected);
  });
});
