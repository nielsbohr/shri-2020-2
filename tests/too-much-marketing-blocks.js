const fs = require('fs');
const { deepEqual } = require('assert');
// const { lint } = require('../core/lint');
require('../build/linter');


const json = fs.readFileSync(`${__dirname}/jsons/index.json`, 'utf8');
const expected = [];


describe('Маркетинговые блоки', () => {
  it('Не больше половины маркетинговых блоков', () => {
    // deepEqual(lint(json), expected);
    // console.log(lint(json));
  });
});
