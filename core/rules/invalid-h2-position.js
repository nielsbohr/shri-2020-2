const Rule = require('../Rule');

module.exports = class INVALID_H2_POSITION extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['text'];
    this._code = 'TEXT.INVALID_H2_POSITION';
    this._text = 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.';
    this._scope = [];
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);

    if (block && block.mods && block.mods.type === 'h1') {
      this._scope.forEach((locH2) => {
        this.addError(locH2);
      });
      this._scope = [];
    } else if (block && block.mods && block.mods.type === 'h2') {
      this._scope.push(loc);
    }
  }
};
