module.exports = {
  blocks: ['text'],
  group: 'text',
  text: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.',
  code: 'INVALID_H2_POSITION',
  loc: 'element',

  check(scope, block) {
    let h2Blocks;
    if (block.mods) {
      if (block.mods.type === 'h1') {
        if (scope.h2.content.length > 0) {
          h2Blocks = scope.h2.content;
          scope.h2.content = [];
          return {
            error: true,
            code: this.code,
            text: this.text,
            loc: h2Blocks,
          };
        }
      } else if (block.mods.type === 'h2') {
        scope.h2.content.push(block);
      }
    }
    return {
      error: false,
    };
  },
};

const Rule = require('../Rule');

module.exports = class INVALID_H2_POSITION extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['text'];
    this._type = 'TEXT';
    this._text = 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.';
    this._scope = [];
    this.lint();
    return this._errors;
  }

  check() {
    const loc = this.findBrackets();
    const block = this.parseBlock(loc);

    if (block && block.mods && block.mods.type === 'h1') {
      // ищем родителя
      const locParent = this.findBrackets(loc.start - 1);

      // кто живет в родителе
      this._scope.forEach((locH2) => {
        if (locH2.start > locParent.start && locH2.end < locParent.end) {
          this.addError(locH2);
        }
      });
    } else if (block.mods.type === 'h2') {
      this._scope.push(loc);
    }
  }
};
