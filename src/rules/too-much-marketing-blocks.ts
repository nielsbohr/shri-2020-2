import { Linter } from "../Linter";
import { Grid } from "../types";

const market: Array<string> = ['commercial', 'offer'];
const code: string = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
const text: string = 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.';

/**
  * Ищем отдельно гриды-родители, в которых указаны колонки, отдельно части.
  * Проходим по гридам-родителям и вычитаем маркетинговые блоки из общего количества.
  * При переходе на следующий грид-родитель смотрим, сколько места занимают маркетинговые
  * блоки. Если больше половины - выбрасываем грид-родитель в ошибку
 */ 
export function lint(linter: Linter): void {
  const allGrids: Array<Grid> = linter.getNodesByBlock('grid');
  const grids: Array<Grid> = allGrids.filter((grid: Grid) => {
    return grid.node.mods && grid.node.mods['m-columns'];
  });
  const fractions: Array<Grid> = allGrids.filter((fraction: Grid) => {
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
      
      if (linter.isParent(fraction, grid) && market.includes(content)) {
        grid.market += parseInt(fraction.node.elemMods['m-col'], 10);
      }
    }

    if (grid.market > Math.floor(grid.columns / 2)) {
      linter.addError(grid.location, code, text);
    }
  }
}