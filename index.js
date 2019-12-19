const rules = [
  require('./core/rules/invalid-button-position'),
  require('./core/rules/invalid-button-size'),
  require('./core/rules/invalid-h2-position'),
  require('./core/rules/invalid-h3-position'),
  require('./core/rules/several-h1'),
  require('./core/rules/text-sizes-should-be-equal'),
  require('./core/rules/invalid-placeholder-size'),
  require('./core/rules/too-much-marketing-blocks'),
];

function lint(json) {
  let errors = [];

  rules.forEach((Rule) => {
    errors = errors.concat(new Rule(json));
  });

  return errors;
}

if (typeof window === 'undefined') {
  global.lint = lint;
} else {
  window.lint = lint;
}

module.exports = { lint };
