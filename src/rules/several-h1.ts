import { Linter } from "../Linter";

interface Scope {
  h1: boolean;
}

const code: string = 'TEXT.SEVERAL_H1';
const text: string = 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.';

export function lint(linter: Linter): void {
  let scope: Scope = {
    h1: false
  };
  const regexText = new RegExp('"block"\\s*:\\s*"text"', 'g');

  for (let n = 0; regexText.test(linter.json); n += 1) {
    const loc = linter.findBrackets(regexText.lastIndex);
    const block = linter.parseBlock(loc);

    if (block && block.mods && block.mods.type === 'h1') {
      if (scope.h1) {
        linter.addError(loc, code, text);
      } else {
        scope.h1 = true;
      }
    }
  }
}
