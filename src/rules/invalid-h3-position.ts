import { Linter, NodeIndexes } from "../Linter";

const code: string = 'TEXT.INVALID_H3_POSITION';
const text: string = 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.';

export function lint(linter: Linter): void {
  let scope: Array<NodeIndexes> = [];
  const regexText = new RegExp('"block"\\s*:\\s*"text"', 'g');

  for (let n = 0; regexText.test(linter.json); n += 1) {
    const loc = linter.findBrackets(regexText.lastIndex);
    const block = linter.parseBlock(loc);

    if (block && block.mods && block.mods.type === 'h2') {
      scope.forEach((locH3: NodeIndexes) => {
        linter.addError(locH3, code, text);
      });
      scope = [];
    } else if (block && block.mods && block.mods.type === 'h3') {
      scope.push(loc);
    }
  }
}
