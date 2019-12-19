const Rule = require('../Rule');

module.exports = class INVALID_BUTTON_SIZE extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['button'];
    this._type = 'WARNING';
    this._text = 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного.';
    this._sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);
    let size;

    if (block.mods && block.mods.size) {
      size = block.mods.size;

      const locParent = this.findBrackets(loc.start - 1);
      const blockParent = this.parseBlock(locParent);

      // поиск эталонного текста
      if (Array.isArray(blockParent.content) && blockParent.block === 'warning') {
        for (let i = 0, refSize; i < blockParent.content.length; i += 1) {
          if (blockParent.content[i].block === 'text' && blockParent.content[i].mods && blockParent.content[i].mods.size) {
            refSize = this._sizes[this._sizes.indexOf(blockParent.content[i].mods.size) + 1];
            if (size !== refSize) {
              this.addError(loc);
            }
          }
        }
      }
    }
  }
};
