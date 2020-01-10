const { expect } = require('chai');
require('./build/linter');

const tests = [
  require('./test/invalid-button-position.test'),
  require('./test/invalid-button-size.test'),
  require('./test/text-sizes-should-be-equal.test'),
  require('./test/invalid-placeholder-size.test'),
  require('./test/invalid-h2-position.test'),
  require('./test/invalid-h3-position.test'),
  require('./test/several-h1.test'),
  require('./test/too-much-marketing-blocks.test'),
];

for (let i = 0; i < tests.length; i += 1) {
  describe(tests[i].code, () => {
    tests[i].data.forEach((testCase) => {
      it(testCase.message, () => {
        const errors = global.lint(testCase.json);
        expect(errors).to.deep.include.members(testCase.expected);
        expect(errors).to.have.length(testCase.length);
      });
    });
  });
}

require('./test/validation.test');
