module.exports = class Rule {
  constructor(json) {
    this._json = json;
    this._errors = [];
  }

  get type() {
    return this._type;
  }

  get errors() {
    return this._errors;
  }

  get blocks() {
    return this._blocks;
  }

  lint() {
    this._regex = new RegExp(`"block"\\s*:\\s*"(${this._blocks.join('|')})"`, 'g');
    for (let n = 0; this._regex.test(this._json); n += 1) {
      this.check();
    }
  }

  parseBlock(loc) {
    return JSON.parse(this._json.slice(loc.start, loc.end + 1));
  }

  findBrackets(loc = this._regex.lastIndex) {
    return {
      start: this.findBracket(loc, true),
      end: this.findBracket(loc, false),
    };
  }

  findBracket(index, start) {
    for (
      let i = index, depth = 1;
      start ? i >= 0 : i < this._json.length;
      start ? i -= 1 : i += 1
    ) {
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

  addError(loc) {
    const info = this.getBlockInfo(loc);
    this._errors.push({
      code: this._code,
      error: this._text,
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
