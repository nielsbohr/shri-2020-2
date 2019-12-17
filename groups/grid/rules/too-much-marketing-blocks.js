const blocks = {
  market: ['commercial', 'offer'],
};

module.exports = {
  blocks: ['grid'],
  group: 'grid',
  text: 'Маркетинговые блоки занимают больше половины от всех колонок блока grid',
  code: 'TOO_MUCH_MARKETING_BLOCKS',
  loc: 'group',

  check(scope, block) {
    let content; let
      columns;

    if (Array.isArray(block.content)) {
      content = block.content;
    } else if (typeof block.content === 'object') {
      content = [block.content];
    }

    if (!block.mods && block.elemMods['m-col']) {
      columns = parseInt(block.elemMods['m-col'], 10);

      for (let i = 0; i < content.length; i += 1) {
        scope.content.push({
          block: content[i].block,
          columns,
        });
      }
    }

    return this.checkColumnsCount(scope);
  },

  // Проверка на последнюю колонку и подсчет рекламных блоков
  checkColumnsCount(scope) {
    let { columns } = scope;
    let columnsMarket = 0;
    for (let i = 0; i < scope.content.length; i += 1) {
      columns -= scope.content[i].columns;
      if (blocks.market.includes(scope.content[i].block)) {
        columnsMarket += scope.content[i].columns;
      }
    }

    if (columnsMarket > parseInt(scope.columns / 2, 10) && columns <= 0) {
      return {
        error: true,
        code: this.code,
        text: this.text,
        loc: this.loc,
      };
    }
    return {
      error: false,
    };
  },
};
