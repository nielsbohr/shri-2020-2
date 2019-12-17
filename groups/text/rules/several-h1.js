module.exports = {
  blocks: ['text'],
  group: 'text',
  text: 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.',
  code: 'SEVERAL_H1',
  loc: 'element',

  check(scope, block) {
    if (block.mods) {
      if (block.mods.type) {
        if (block.mods.type === 'h1') {
          if (scope.h1.status) {
            return {
              error: true,
              code: this.code,
              text: this.text,
              loc: block.loc,
            };
          }
          scope.h1.status = true;
        }
      }
    }
    return {
      error: false,
    };
  },
};
