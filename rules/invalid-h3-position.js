const Rule = require('../Rule');

module.exports = class INVALID_H3_POSITION extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['text'];
    this._type = 'TEXT';
    this._text = 'Заголовок второго уровня (блок text с модификатором type h3) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.';
    this._scope = [];
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);

    if (block && block.mods && block.mods.type === 'h2') {
      // ищем родителя
      const locParent = this.findBrackets(loc.start - 1);

      // кто живет в родителе
      this._scope.forEach((locH2) => {
        if (locH2.start > locParent.start && locH2.end < locParent.end) {
          this.addError(locH2);
        }
      });
    } else if (block.mods.type === 'h3') {
      this._scope.push(loc);
    }
  }
};
