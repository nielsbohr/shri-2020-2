const Rule = require('../Rule');

module.exports = class INVALID_BUTTON_POSITION extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['placeholder'];
    this._code = 'WARNING.INVALID_BUTTON_POSITION';
    this._text = 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.';
    this._warnings = [];
    this.lint();
    return this._errors;
  }

  lint() {
    this._regex = new RegExp(`"block"\\s*:\\s*"(${this._blocks.join('|')})"`, 'g');
    for (let n = 0; this._regex.test(this._json); n += 1) {
      this.check();
    }
    this.buttonCheck(this._warnings);
  }

  buttonCheck() {
    this._regex = new RegExp('"block"\\s*:\\s*"button"', 'g');
    for (let n = 0, buttonLoc; this._regex.test(this._json); n += 1) {
      buttonLoc = this.findBrackets();
      for (let i = 0; i < this._warnings.length; i += 1) {
        if (buttonLoc.start > this._warnings[i].start && buttonLoc.end < this._warnings[i].end) {
          this.addError(buttonLoc);
          break;
        }
      }
    }
  }

  check() {
    const loc = this.findBrackets();
    const locParent = this.findBrackets(loc.start - 1);
    const blockParent = this.parseBlock(locParent);

    if (blockParent.block === 'warning') {
      this._warnings.push(locParent);
    }
  }
};
