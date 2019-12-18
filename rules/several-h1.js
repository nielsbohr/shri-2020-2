const Rule = require('../Rule');

module.exports = class SEVERAL_H1 extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['text'];
    this._type = 'TEXT';
    this._text = 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.';
    this._scope = {
      h1: false,
    };
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);

    if (block.mods) {
      if (block.mods.type === 'h1') {
        if (this._scope.h1) {
          this.addError(loc);
        }
        this._scope.h1 = true;
      }
    }
  }
};