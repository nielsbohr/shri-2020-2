module.exports = {
  blocks: ['text'],
  group: 'text',
  text: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.',
  code: 'INVALID_H2_POSITION',
  loc: 'element',

  check(scope, block) {
    let h2Blocks;
    if (block.mods) {
      if (block.mods.type) {
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
    }
    return {
      error: false,
    };
  },
};
