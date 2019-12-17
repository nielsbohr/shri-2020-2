const fs = require('fs');
const { equal } = require('assert');
const { Linter } = require('../classes/Linter');


const json = fs.readFileSync(`${__dirname}/jsons/index.json`, 'utf8');

describe('invalid-button-position v1', () => {
  it('should return buttons', () => {
    equal(new Linter(json).lint(), []);
  });
});
