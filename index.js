const { lint } = require('./core/lint');

if (typeof window === 'undefined') {
  global.lint = lint;
} else {
  window.lint = lint;
}
