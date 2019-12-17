const { Linter } = require('./classes/Linter');

function lint(json) {
  const linter = new Linter(json);

  return linter.lint();
}

if (typeof window === 'undefined') {
  global.lint = lint;
} else {
  window.lint = lint;
}
