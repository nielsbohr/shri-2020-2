const path = require('path');
const Group = require('../../classes/Group');

class GridGroup extends Group {
  constructor(json) {
    super(json);

    this._type = 'GRID';
    this._rules = [];
    this._groupBlocks = ['grid'];
    this.getRules(path.join(__dirname, './rules'));
    this.getBlocksFromRules();
  }

  // проходим по правилам
  check(block) {
    // Включаем блок grid в scope
    if (block.block === 'grid' && block.mods) {
      if (parseInt(block.mods['m-columns'], 10)) {
        this.addLatest({
          start: block.loc.start,
          end: block.loc.end,
          columns: parseInt(block.mods['m-columns'], 10),
          content: [],
        });
      }
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


    return this.errors;
  }
}

module.exports = GridGroup;
