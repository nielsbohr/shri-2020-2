const { throws } = require('assert');
require('../build/linter');

const json = `{
  "valid?" : "NOPE""
}`;

describe('Невалидный JSON', () => {
  it('', () => {
    throws(() => global.lint(json), Error, 'JSON is not valid');
  });
});
