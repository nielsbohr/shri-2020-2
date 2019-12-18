const path = require('path');
const Group = require('../../classes/Group');


class WarningGroup extends Group {
  constructor(json) {
    super(json);
    this._type = 'WARNING';
    this._groupBlocks = ['warning'];
    this._rules = [];
    this._scope = [];
    this.getRules(path.join(__dirname, './rules'));
    this.getBlocksFromRules();
  }

  get latest() {
    if (this.scope.length > 0) {
      return this.scope[this.scope.length - 1];
    }
    return false;
  }

  delLatest() {
    if (this.scope.length > 0) {
      this.scope.pop();
    }
  }

  addLatest(obj) {
    obj.buttons = [];
    this.scope.push(obj);
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
    for (let i = 0, res; i < this.rules.length; i += 1) {
      if (this.rules[i].blocks.includes(block.block)) {
        res = this.rules[i].check(
          this.rules[i].scope === 'latest' ? this.latest : this.scope,
          block,
        );
        if (res.error === true) {
          this.addError(res, block);
        }
      }
    }

    return this.errors;
  }
}

module.exports = WarningGroup;
