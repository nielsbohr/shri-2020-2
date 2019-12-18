module.exports = {
  blocks: ['button', 'placeholder'],
  group: 'warning',
  text: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.',
  code: 'INVALID_BUTTON_POSITION',
  loc: 'elements',

  check(scope) {
    if (scope.buttons.length > 0) {
      return {
        error: true,
        code: this.code,
        text: this.text,
        loc: scope.buttons,
      };
    }
    return {
      error: false,
    };
  },
};
