const fs = require('fs');
const { throws } = require('assert');
const { lint } = require('../out/index');

const error = 'Невалидный JSON';
const json = fs.readFileSync(`${__dirname}/jsons/notValid.json`, 'utf8');

describe(error, () => {
  it(error, () => {
    throws(() => lint(json), Error, 'JSON is not valid');
  });
});
