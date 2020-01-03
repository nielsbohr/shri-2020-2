import { Linter } from '../Linter';

const code: string = 'WARNING.INVALID_BUTTON_SIZE';
const text: string = 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного.';
const sizes: Array<string> = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];

export function lint(linter: Linter): void {
  const regexButton = new RegExp('"block"\\s*:\\s*"button"', 'g');
  
  for (let n = 0; regexButton.test(linter.json); n += 1) {
    const loc = linter.findBrackets(regexButton.lastIndex);
    const block = linter.parseBlock(loc);
    let size;

    if (block.mods && block.mods.size) {
      size = block.mods.size;

      const locParent = linter.findBrackets(loc.start - 1);
      const blockParent = linter.parseBlock(locParent);

      if (Array.isArray(blockParent.content) && blockParent.block === 'warning') {
        for (let i = 0, refSize; i < blockParent.content.length; i += 1) {
          if (blockParent.content[i].block === 'text' && blockParent.content[i].mods && blockParent.content[i].mods.size) {
            refSize = sizes[sizes.indexOf(blockParent.content[i].mods.size) + 1];
            if (size !== refSize) {
              linter.addError(loc, code, text);
              break;
            }
          }
        }
      }
    }
  }
}
