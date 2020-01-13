import { Linter } from "../Linter";
import { Node } from '../types';

const CODE: string = 'WARNING.INVALID_PLACEHOLDER_SIZE';
const MESSAGE: string = 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.';
const SIZES: Array<string> = ['s', 'm', 'l'];

export function lint(linter: Linter): void {
  const placeholders = linter.getNodesByBlock('placeholder');

  placeholders.forEach((placeholder: Node) => {
    const parentNode = linter.getParent(placeholder);
    if (placeholder.node.mods && placeholder.node.mods.size) {
      if (parentNode.node.block === 'warning' && !SIZES.includes(placeholder.node.mods.size)) {
        linter.addError(placeholder.location, CODE, MESSAGE); 
      }
    }
  });
}
