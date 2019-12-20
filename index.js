const rules = require('./rules.js');

function lint(json) {
  const errors = [];

  rules.forEach((Rule) => {
    errors.push(...new (Rule())(json));
  });

  return errors;
}

if (typeof window === 'undefined') {
  global.lint = lint;
} else {
  window.lint = lint;
}

module.exports = { lint };
