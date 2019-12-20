const Rule = require('../Rule');

module.exports = class TOO_MUCH_MARKETING_BLOCKS extends Rule {
  constructor(json) {
    super(json);
    this._market = ['commercial', 'offer'];
    this._blocks = ['grid'];
    this._code = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
    this._text = 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.';
    this._grid = [];
    this.lint();
    this.lintCount();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);

    if (block.mods && block.mods['m-columns']) {
      this._grid.push({
        loc,
        columns: parseInt(block.mods['m-columns'], 10),
      });
    } else if (block.elemMods && block.elemMods['m-col']) {
      for (let i = 0; i < this._grid.length; i += 1) {
        if (loc.start > this._grid[i].loc.start && loc.end < this._grid[i].loc.end) {
          if (!this._grid[i].content) this._grid[i].content = [];
          this._grid[i].content.push({
            columns: block.elemMods['m-col'],
            content: block.content,
          });
        }
      }
    }
  }

  lintCount() {
    this._grid.forEach((grid) => {
      let columnsMarket = 0;
      for (let i = 0; i < grid.content.length; i += 1) {
        if (this._market.includes(grid.content[i].content[0].block)) {
          columnsMarket += grid.content[i].columns;
        }
      }
      if (columnsMarket > parseInt(grid.columns / 2, 10)) {
        this.addError(grid.loc);
      }
    });
  }
};
