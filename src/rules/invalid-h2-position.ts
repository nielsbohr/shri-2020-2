import { Linter, BlockIndexes } from "../Linter";

const code: string = 'TEXT.INVALID_H2_POSITION';
const text: string = 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.';

export function lint(linter: Linter): void {
  let scope: Array<BlockIndexes> = [];
  const regexText = new RegExp('"block"\\s*:\\s*"text"', 'g');

  for (let n = 0; regexText.test(linter.json); n += 1) {
    const loc = linter.findBrackets(regexText.lastIndex);
    const block = linter.parseBlock(loc);

    if (block && block.mods && block.mods.type === 'h1') {
      scope.forEach((locH2: BlockIndexes) => {
        linter.addError(locH2, code, text);
      });
      scope = [];
    } else if (block && block.mods && block.mods.type === 'h2') {
      scope.push(loc);
    }
  }
}
