const WarningGroup = require('../groups/warning');
const TextGroup = require('../groups/text');
const GridGroup = require('../groups/grid');
const findBrackets = require('../helpers/findBrackets');

class Linter {
    constructor (json) {
        this._json = json;
        this._errors = [];
        this._groups = [new WarningGroup(json), new TextGroup(json), new GridGroup(json)];
        this._neededBlocks = this._groups[2].blocks;
        this._regexBlock = new RegExp(`\"block\"\\s*:\\s*\"(${this._neededBlocks.join('|')})\"`, `g`);
    }

    get json() {
        return this._json;
    }

    get rBlock() {
        return this._regexBlock;
    }

    get groups() {
        return this._groups;
    }

    get errors() {
        return this._errors;
    }

    lint() {
        for (let n = 0; this.rBlock.test(this.json); n++) {
            const block = this.parseBlock(this.rBlock.lastIndex);
            for (let j = 0; j < this.groups.length; j++) {
                this.groups[j].check(block);
            }
        }
        // return [...this.groups[0].errors, ...this.groups[1].errors]
        return this.groups[2].errors
    }

    parseBlock(index) {
        const loc = findBrackets(this.json, index);
        const block = JSON.parse(this.json.slice(loc.start, loc.end + 1));
        block.loc = loc;
        return block;
    }
}

module.exports = { Linter };