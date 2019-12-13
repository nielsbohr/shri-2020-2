const makeLint = require('../rules/warningLinter');
const findBrackets = require('../helpers/findBrackets');
const { getBlockInfo } = require('../helpers/getBlockInfo');

class Linter {
    constructor (json) {
        this.json = json;
        this.errors = [];
        this.scope = {
            warning: [],
            text: {
                h1: {
                    status: false,
                    content: []
                },
                h2: {
                    status: false,
                    content: []
                },
                h3: {
                    status: false,
                    content: []
                }
            },
            grid: []
        }
    }

    lint() {
        makeLint.call(this);
        return this.errors;
    }

    addError(code, loc) {
        const info = getBlockInfo(this.json, loc);
        this.errors.push({
            code: code,
            location: {
                start: {
                    column: info.column.start,
                    line: info.line.start
                },
                end: {
                    column: info.column.end,
                    line: info.line.end
                },
            }
        })
    }

    parseBlock(index) {
        const loc = findBrackets(this.json, index);
        const block = JSON.parse(this.json.slice(loc.start, loc.end + 1));
        block.loc = loc;
        return block;
    }

    addScope(name, obj) {
        this.scope[name].push(obj);
    }

    getScope(name) {
        if (Array.isArray(this.scope[name])) {
            if (this.scope[name].length) {
                return this.scope[name][this.scope[name].length - 1];
            }
        } else if (typeof this.scope[name] === 'object') {
            return this.scope[name];           
        }
        return false;
    }

    setScope(name, obj) {
        if (name === 'text') console.log(obj);
        if (Array.isArray(this.scope[name])) {
            if (this.scope[name].length) {
                this.scope[name][this.scope[name].length - 1] = obj;
            }
        } else if (typeof this.scope[name] === 'object') {
            return this.scope[name] = obj;           
        }
    }

    delScope(name) {
        this.scope[name].pop();
    }
}

module.exports = { Linter };