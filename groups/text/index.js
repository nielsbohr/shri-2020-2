const path = require('path');
const Group = require('../../classes/Group');

class TextGroup extends Group {
  constructor(json) {
    super(json);

    this._type = 'TEXT';
    this._rules = [];
    this._groupBlocks = ['text'];
    this._scope = {
      h1: {
        status: false,
      },
      h2: {
        content: [],
      },
      h3: {
        content: [],
      },
    };

    this.getRules(path.join(__dirname, './rules'));
    this.getBlocksFromRules();
  }

  // проходим по правилам
  check(block) {
    for (let i = 0, res; i < this.rules.length; i++) {
      if (this.rules[i].blocks.includes(block.block)) {
        res = this.rules[i].check(this.scope, block);
        if (res.error === true) {
          if (Array.isArray(res.loc)) {
            for (let i = 0; i < res.loc.length; i++) {
              this.addError(res, res.loc[i]);
            }
          } else {
            this.addError(res, block);
          }
        }
      }
    }

    return this.errors;
  }
}

module.exports = TextGroup;
