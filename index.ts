const Linter = require('./core/Linter');

function lint(json: string) {
  if (typeof json !== 'string') throw new Error('JSON is not string');
  const linter = new Linter(json);

  linter.lint();
  
  return linter.results
}

if (typeof window === 'undefined') {
  global.lint = lint;
} else {
  window.lint = lint;
}

module.exports = { lint };
