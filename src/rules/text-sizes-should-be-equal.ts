import { Linter } from "../Linter";

const code: string = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';
const text: string = 'Текст не является эталонным.';

export function lint(linter: Linter): void {
  const regexWarning = new RegExp('"block"\\s*:\\s*"warning"', 'g');
  for (let n = 0; regexWarning.test(linter.json); n += 1) {
    const loc = linter.findBrackets(regexWarning.lastIndex);
    const block = linter.parseBlock(loc);

    for (let i = 0, text, referenceSize; i < block.content.length; i += 1) {
      if (block.content[i].block === 'text') {
        text = block.content[i];
        if (referenceSize && text.mods) {
          if (text.mods.size !== referenceSize) {
            linter.addError(loc, code, text);
            break;
          }
        } else if (text.mods) {
          referenceSize = text.mods.size;
        }
      }
    }
  }
}