import { Linter } from "../Linter";

const code: string = 'WARNING.INVALID_PLACEHOLDER_SIZE';
const text: string = 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.';
const sizes: Array<string> = ['s', 'm', 'l'];

export function lint(linter: Linter): void {
  const regexPlaceholder = new RegExp('"block"\\s*:\\s*"placeholder"', 'g');
  for (let n = 0; regexPlaceholder.test(linter.json); n += 1) {
    const loc = linter.findBrackets(regexPlaceholder.lastIndex);
    const block = linter.parseBlock(loc);

    if (block.mods && block.mods.size) {
      const locParent = linter.findBrackets(loc.start - 1);
      const blockParent = linter.parseBlock(locParent);

      if (blockParent.block === 'warning' && !sizes.includes(block.mods.size)) { linter.addError(loc, code, text); }
    }
  }
}
