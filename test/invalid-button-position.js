const Rule = require('../Rule');

module.exports = class INVALID_BUTTON_POSITION extends Rule {
  constructor(json) {
    super(json);
    this._blocks = ['warning'];
    this._type = 'warning';
    this._text = 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.';
    this.createRegex();
  }

  check(block) {
    for (let n = 0; this._regex.test(this._json); n += 1) {
      if (block.block === 'warning') {
        for (let i = 0; i < block.content.length; i += 1) {
          if (block.content[i].block === 'placeholder') {
            if (scope.length > 0) {
              scope[scope.length - 1].placeholder = true;
            }
          }
        }
      } else if (block.block === 'button') {
        for (let i = 0; i < scope.length; i += 1) {
          if (scope[i].placeholder) {
            return {
              error: true,
              code: this.code,
              text: this.text,
              loc: block.loc,
            };
          }
        }
      }

      return {
        error: false,
      };
    }
  }
};
