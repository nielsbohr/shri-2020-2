import { Linter } from '../Linter';
import { Node } from '../types';

const CODE: string = 'WARNING.INVALID_BUTTON_SIZE';
const MESSAGE: string = 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного.';
const SIZES: Array<string> = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];

export function lint(linter: Linter): void {
  const texts: Array<Node> = linter.getNodesByBlock('text');
  const buttons: Array<Node> = linter.getNodesByBlock('button');
  const warnings: Array<Node> = linter.getNodesByBlock('warning');
  
  for (let i = 0; i < warnings.length; i++) {
    const warning = warnings[i];
    for (let j = 0; j < texts.length; j++) {
      const text = texts[j];
      if (
        text.node.mods && 
        text.node.mods.size &&
        linter.isParent(text, warning)
      ) {
        warning.text = text.node.mods.size;
        break;
      }
    }

    if (!warning.text) { continue; }

    for (let j = 0; j < buttons.length; j++) {
      const button = buttons[j];
      if (
        button.node.mods && 
        button.node.mods.size &&
        linter.isParent(button, warning) &&
        warning.text !== SIZES[SIZES.indexOf(button.node.mods.size) - 1]
      ) {
        linter.addError(button.location, CODE, MESSAGE);
      }
    }
  }
}
