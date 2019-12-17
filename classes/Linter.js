const WarningGroup = require('../groups/warning');
const TextGroup = require('../groups/text');
const GridGroup = require('../groups/grid');

class Linter {
  constructor(json) {
    this._json = json;
    this._groups = [
      new WarningGroup(this._json),
      new TextGroup(this._json),
      new GridGroup(this._json),
    ];
    this._neededBlocks = this.getNeededBlocks();
    this._regex = new RegExp(`"block"\\s*:\\s*"(${this._neededBlocks.join('|')})"`, 'g');
  }

  getNeededBlocks() {
    let blocks = [];
    for (let i = 0; i < this._groups.length; i += 1) {
      blocks = blocks.concat(this._groups[i].blocks);
    }
    blocks = blocks.filter((item, pos) => blocks.indexOf(item) === pos);

    return blocks;
  }

  lint() {
    for (let n = 0; this._regex.test(this._json); n += 1) {
      const block = this.parseBlock(this._regex.lastIndex);
      for (let j = 0; j < this._groups.length; j += 1) {
        this._groups[j].check(block);
      }
    }
    return this._groups.reduce((acc, el) => {
      acc = acc.concat(el.errors);
      return acc;
    }, []);
  }

  parseBlock(index) {
    const loc = {
      start: this.findBracket(index, true),
      end: this.findBracket(index, false),
    };
    const block = JSON.parse(this._json.slice(loc.start, loc.end + 1));
    block.loc = loc;
    return block;
  }

  findBracket(index, start) {
    let depth = 1;
    for (let i = index; start ? i >= 0 : i < this._json.length; start ? i -= 1 : i += 1) {
      switch (this._json[i]) {
        case start ? '}' : '{':
          depth += 1;
          break;
        case start ? '{' : '}':
          if (--depth === 0) {
            return i;
          }
          break;
        default:
          break;
      }
    }

    return -1;
  }
}

module.exports = { Linter };
