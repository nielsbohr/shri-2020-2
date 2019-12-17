const fs = require('fs');

module.exports = class Group {
  constructor(json) {
    this._json = json;
    this._errors = [];
    this._type = '';
    this._scope = [];
    this._rules = [];
  }

  get type() {
    return this._type;
  }

  get rules() {
    return this._rules;
  }

  get scope() {
    return this._scope;
  }

  get errors() {
    return this._errors;
  }

  get blocks() {
    return this._blocks;
  }

  get latest() {
    if (this.scope.length > 0) {
      return this.scope[this.scope.length - 1];
    }
    return false;
  }

  set latest(obj) {
    if (this.scope.length > 0) {
      this.scope[this.scope.length - 1] = obj;
    }
  }

  delLatest() {
    if (this.scope.length > 0) {
      this.scope.pop();
    }
  }

  addLatest(obj) {
    obj.errors = [];
    obj.buttons = [];
    this.scope.push(obj);
  }

  getRules(dir) {
    fs.readdirSync(dir).forEach((file) => {
      this._rules.push(require(`${dir}/${file}`));
    });
  }

  getBlocksFromRules() {
    this._blocks = this._rules.reduce((acc, cur) => {
      for (let i = 0; i < cur.blocks.length; i += 1) {
        if (!acc.includes(cur.blocks[i])) {
          acc.push(cur.blocks[i]);
        }
      }

      return acc;
    }, this._groupBlocks);
  }

  addError(res, block) {
    if (res.loc === 'group') {
      if (this.latest.errors.includes(res.code)) {
        return;
      }
      block = this.latest;
      this.latest.errors.push(res.code);
    } else {
      block = block.loc;
    }
    const info = this.getBlockInfo(block);
    this._errors.push({
      code: `${this.type}.${res.code}`,
      error: res.text,
      location: {
        start: {
          column: info.column.start,
          line: info.line.start,
        },
        end: {
          column: info.column.end,
          line: info.line.end,
        },
      },
    });
  }

  getBlockInfo(loc) {
    const lineBreakG = new RegExp('\\r\\n?|\\n|\\u2028|\\u2029', 'g');

    loc.column = {};
    loc.line = {};
    let offset = loc.start;
    for (let line = 1, cur = 0; ;) {
      lineBreakG.lastIndex = cur;
      const match = lineBreakG.exec(this._json);
      if (match && match.index < offset) {
        ++line;
        cur = match.index + match[0].length;
      } else if (offset === loc.start) {
        loc.column.start = offset - cur + 1;
        loc.line.start = line;
        offset = loc.end;
      } else {
        loc.column.end = offset - cur + 2;
        loc.line.end = line;
        return loc;
      }
    }
  }
};
