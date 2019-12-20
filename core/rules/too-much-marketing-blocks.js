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

  lint() {
    this._regex = new RegExp(`"block"\\s*:\\s*"(${this._blocks.join('|')})"`, 'g');
    for (let n = 0; this._regex.test(this._json); n += 1) {
      this.check();
    }
    this._grid.forEach((grid) => {
      this.lintCount(grid);
    });
  }

  lintCount(grid) {
    let columnsMarket = 0;
    for (let i = 0; i < grid.content.length; i += 1) {
      if (this._market.includes(grid.content[i].content[0].block)) {
        columnsMarket += grid.content[i].columns;
      }
    }
    if (columnsMarket > parseInt(grid.columns / 2, 10)) {
      this.addError(grid.loc);
    }
  }
};
