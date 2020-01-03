import { Linter } from "../Linter";

const market: Array<string> = ['commercial', 'offer'];
const code: string = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
const text: string = 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.';

export function lint(linter: Linter): void {
  const grid: any = [];
  const regexGrid = new RegExp('"block"\\s*:\\s*"grid"', 'g');
  for (let n = 0; regexGrid.test(linter.json); n += 1) {
    const loc = linter.findBrackets(regexGrid.lastIndex);
    const block = linter.parseBlock(loc);

    if (block.mods && block.mods['m-columns']) {
      grid.push({
        loc,
        columns: parseInt(block.mods['m-columns'], 10),
      });
    } else if (block.elemMods && block.elemMods['m-col']) {
      for (let i = 0; i < grid.length; i += 1) {
        if (loc.start > grid[i].loc.start && loc.end < grid[i].loc.end) {
          if (!grid[i].hasOwnProperty('content')) { 
            grid[i].content = [];
          }
          grid[i].content.push({
            columns: block.elemMods['m-col'],
            content: block.content,
          });
        }
      }
    }
  }

  grid.forEach((grid: any) => {
    let columnsMarket = 0;
    for (let i = 0; i < grid.content.length; i += 1) {
      if (market.includes(grid.content[i].content[0].block)) {
        columnsMarket += grid.content[i].columns;
      }
    }
    if (columnsMarket > parseInt(grid.columns, 10) / 2) {
      linter.addError(grid.loc, code, text);
    }
  });
}