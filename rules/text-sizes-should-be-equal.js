const Rule = require('../Rule');

module.exports = class TEXT_SIZES_SHOULD_BE_EQUAL extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['warning'];
    this._type = 'WARNING';
    this._text = 'Текст не является эталонным.';
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);
    for (let i = 0, text, referenceSize; i < block.content.length; i += 1) {
      if (block.content[i].block === 'text') {
        text = block.content[i];
        if (referenceSize && text.mods) {
          if (text.mods.size !== referenceSize) {
            this.addError(loc);
            break;
          }
        } else if (text.mods) {
          referenceSize = text.mods.size;
        }
      }
    }
  }
};
