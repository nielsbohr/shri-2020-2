import { Linter } from '../Linter';

const code: string = 'WARNING.INVALID_BUTTON_POSITION';
const text: string = `Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.`; 

export function lint(linter: Linter): void {
  const warnings = [];

  const regexPlaceholder = new RegExp('"block"\\s*:\\s*"placeholder"', 'g');
  for (let n = 0; regexPlaceholder.test(linter.json); n += 1) {
    const loc = linter.findBrackets(regexPlaceholder.lastIndex);
    const locParent = linter.findBrackets(loc.start - 1);
    const blockParent = linter.parseBlock(locParent);

    if (blockParent.block === 'warning') {
      warnings.push({
        locParent,
        locPlaceholder: loc,
      });
    }
  }

  const regexButton = new RegExp('"block"\\s*:\\s*"button"', 'g');
  for (let n = 0; regexButton.test(linter.json); n += 1) {
    const locButton = linter.findBrackets(regexButton.lastIndex);
    for (let i = 0; i < warnings.length; i += 1) {
      if (
        locButton.start > warnings[i].locParent.start
          && locButton.end < warnings[i].locParent.end
          && locButton.end < warnings[i].locPlaceholder.start
      ) {
        linter.addError(locButton, code, text);
        break;
      }
    }
  }
}
