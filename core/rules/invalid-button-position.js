const Rule = require('../Rule');

module.exports = class INVALID_BUTTON_POSITION extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['placeholder', 'button'];
    this._code = 'WARNING.INVALID_BUTTON_POSITION';
    this._text = 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.';
    this._buttons = [];
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);

    if (block.block === 'button') {
      this._buttons.push(loc);
    }

    if (block.block === 'placeholder') {
      const locParent = this.findBrackets(loc.start - 1);
      const blockParent = this.parseBlock(locParent);

      if (blockParent.block === 'warning') {
        this._buttons.forEach((buttonLoc) => {
          if (buttonLoc.start > locParent.start && buttonLoc.end < locParent.end) {
            this.addError(buttonLoc);
          }
        });
      }
    }
  }
};
