const Rule = require('../core/Rule');

module.exports = class TOO_MUCH_MARKETING_BLOCKS extends Rule {
  constructor(json) {
    super(json);
    this._market = ['commercial', 'offer'];
    this._blocks = ['grid'];
    this._type = 'GRID';
    this._text = 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.';
    this._grid = [];
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);

    if (block.block === 'grid' && block.mods && block.mods['m-columns']) {
      this._grid.push({
        loc,
        columns: block.mods['m-columns'],
      });
    } else if (block.block === 'grid' && block.elemMods && block.elemMods['m-col']) {
      if (!Array.isArray(block.content)) block.content = [block.content];
      block.content.forEach((el) => {
        if (this._market.includes(el.block)) {

        }
      });
      this._grid.forEach((grid) => {
        if (loc.start > grid.loc.start && loc.end < grid.loc.end) {
          if (!grid.content) grid.content = [];
          grid.content.push();
        }
      });
    }

    const locParent = this.findBrackets(loc.start - 1);
    const blockParent = this.parseBlock(locParent);

    if (blockParent.block === 'grid' && blockParent.elemMods && blockParent.elemMods['m-col']) {

    }

    if (block.mods && block.mods['m-columns']) {
      this._grid.push({
        loc,
        columns: block.mods['m-columns'],
      });
    }

    let content; let
      columns;

    if (!Array.isArray(block.content)) content = block.content;

    if (!block.mods && block.elemMods['m-col']) {
      columns = parseInt(block.elemMods['m-col'], 10);

      for (let i = 0; i < content.length; i += 1) {
        scope.content.push({
          block: content[i].block,
          columns,
        });
      }
    }

    return this.checkColumnsCount(scope);
  }

  checkColumnsCount(scope) {
    let { columns } = scope;
    let columnsMarket = 0;
    for (let i = 0; i < scope.content.length; i += 1) {
      columns -= scope.content[i].columns;
      if (blocks.market.includes(scope.content[i].block)) {
        columnsMarket += scope.content[i].columns;
      }
    }

    if (columnsMarket > parseInt(scope.columns / 2, 10) && columns <= 0) {
      return {
        error: true,
        code: this.code,
        text: this.text,
        loc: this.loc,
      };
    }
    return {
      error: false,
    };
  }
};
