const warningLinter = require('../rules/warningLinter');

class Linter {
    constructor (json) {
        this.json = json;
        this.errors = [];
        this.lint = warningLinter.bind(this);
    }

    addError(code, loc) {
        this.errors.push({
            code: code,
            location: {
                start: {
                    column: loc.start,
                    line: loc.start
                },
                end: {
                    column: loc.end,
                    line: loc.end
                },
            }
        })
    }
}

module.exports = { Linter };