const path = require('path');
const Group = require('../../classes/Group');


class WarningGroup extends Group {
  constructor(json) {
    super(json);
    this._type = 'WARNING';
    this._groupBlocks = ['warning'];
    this._rules = [];
    this.getBlocksFromRules(path.join(__dirname, './rules'));
  }

  check(block) {
    // Включаем блок warning в scope
    if (block.block === 'warning') {
      this.addLatest(block.loc);
    }

    // Убираем scope, если уже вышли из него
    while (this.latest) {
      if (block.loc.start > this.latest.end) {
        this.delLatest();
      } else {
        break;
      }
    }

    // проходим по правилам
    let res;

    if (this.latest !== false) {
      for (let i = 0; i < this.rules.length; i += 1) {
        if (this.rules[i].blocks.includes(block.block)) {
          res = this.rules[i].check(this.latest, block);
          if (res.error === true) {
            if (Array.isArray(res.loc)) {
              for (let j = 0; j < res.loc.length; j += 1) {
                this.addError(res, res.loc[j]);
              }
            } else {
              this.addError(res, block);
            }
          }
        }
      }
    }

    return this.errors;
  }
}

module.exports = WarningGroup;
