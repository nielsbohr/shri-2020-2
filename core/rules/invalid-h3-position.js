const Rule = require('../Rule');

module.exports = class INVALID_H3_POSITION extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['text'];
    this._code = 'TEXT.INVALID_H3_POSITION';
    this._text = 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.';
    this._scope = [];
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);

    if (block && block.mods && block.mods.type === 'h2') {
      this._scope.forEach((locH3) => {
        this.addError(locH3);
      });
      this._scope = [];
    } else if (block && block.mods && block.mods.type === 'h3') {
      this._scope.push(loc);
    }
  }
};
