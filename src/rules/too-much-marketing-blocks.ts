import { Linter } from "../Linter";
import { Node } from "../types";

const MARKET: Array<string> = ['commercial', 'offer'];
const CODE: string = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
const MESSAGE: string = 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.';

/**
  * Ищем отдельно гриды-родители, в которых указаны колонки, отдельно части.
  * Проходим по гридам-родителям и вычитаем маркетинговые блоки из общего количества.
  * При переходе на следующий грид-родитель смотрим, сколько места занимают маркетинговые
  * блоки. Если больше половины - выбрасываем грид-родитель в ошибку
 */ 
export function lint(linter: Linter): void {
  const allGrids: Array<Node> = linter.getNodesByBlock('grid');
  const grids: Array<Node> = allGrids.filter((grid: Node) => {
    return grid.node.mods && grid.node.mods['m-columns'];
  });
  const fractions: Array<Node> = allGrids.filter((fraction: Node) => {
    return fraction.node.elemMods && fraction.node.elemMods['m-col'];
  });

  for (let i = 0; i < grids.length; i++) {
    const grid = grids[i];
    grid.columns = parseInt(grid.node.mods['m-columns'], 10);
    grid.market = 0;
    for (let j = 0; j < fractions.length; j++) {
      const fraction = fractions[j];
      const content = Array.isArray(fraction.node.content) ?
       fraction.node.content[0].block : fraction.node.content.block;
      
      if (linter.isParent(fraction, grid) && MARKET.includes(content)) {
        grid.market += parseInt(fraction.node.elemMods['m-col'], 10);
      }
    }

    if (grid.market > Math.floor(grid.columns / 2)) {
      linter.addError(grid.location, CODE, MESSAGE);
    }
  }
}