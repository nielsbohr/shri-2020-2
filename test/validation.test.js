const { throws } = require('assert');
require('../build/linter');

const json = `{
  "valid?" : "NOPE""
}`;

describe('Invalid JSON', () => {
  it('', () => {
    throws(() => global.lint(json), Error, 'JSON is not valid');
  });
});
