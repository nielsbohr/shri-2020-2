module.exports = {
  blocks: ['placeholder'], // Необходимые блоки для правила
  group: 'warning',
  text: 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.',
  code: 'INVALID_PLACEHOLDER_SIZE',
  scope: 'latest',
  loc: 'element',

  check(scope, block) {
    if (block.mods) {
      if (!['s', 'm', 'l'].includes(block.mods.size)) {
        return {
          error: true,
          code: this.code,
          text: this.text,
          loc: block.loc,
        };
      }
    }
    return {
      error: false,
    };
  },
};