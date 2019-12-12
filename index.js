const { Linter } = require('./core/init');

if (typeof window === 'undefined') {
    global.lint = lint;
} else {
    window.lint = lint;
}

function lint(json) {
    const linter = new Linter(json);
    linter.lint();

    return linter.errors;
};