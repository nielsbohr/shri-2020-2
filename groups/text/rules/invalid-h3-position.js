module.exports = {
  blocks: ['text'],
  group: 'text',
  text: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.',
  code: 'INVALID_H3_POSITION',
  loc: 'element',

  check(scope, block) {
    let h3Blocks;
    if (block.mods) {
      if (block.mods.type) {
        if (block.mods.type === 'h2') {
          if (scope.h3.content.length > 0) {
            h3Blocks = scope.h3.content;
            scope.h3.content = [];
            return {
              error: true,
              code: this.code,
              text: this.text,
              loc: h3Blocks,
            };
          }
        } else if (block.mods.type === 'h3') {
          scope.h3.content.push(block);
        }
      }
    }
    return {
      error: false,
    };
  },
};
