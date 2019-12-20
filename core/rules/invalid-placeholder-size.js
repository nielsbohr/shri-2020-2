const Rule = require('../Rule');

module.exports = class INVALID_BUTTON_SIZE extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['placeholder'];
    this._code = 'WARNING.INVALID_PLACEHOLDER_SIZE';
    this._text = 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.';
    this._sizes = ['s', 'm', 'l'];
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);

    if (block.mods && block.mods.size) {
      const locParent = this.findBrackets(loc.start - 1);
      const blockParent = this.parseBlock(locParent);

      if (blockParent.block === 'warning' && !this._sizes.includes(block.mods.size)) this.addError(loc);
    }
  }
};
