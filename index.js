const rules = require('./rules.js');

function lint(json) {
  let errors = [];

  rules.forEach((Rule) => {
    errors = errors.concat(new (Rule())(json));
  });

  return errors;
}

if (typeof window === 'undefined') {
  global.lint = lint;
} else {
  window.lint = lint;
}

module.exports = { lint };
