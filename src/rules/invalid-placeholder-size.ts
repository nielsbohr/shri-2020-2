import { Linter } from "../Linter";
import { Node } from '../types';

const code: string = 'WARNING.INVALID_PLACEHOLDER_SIZE';
const text: string = 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.';
const sizes: Array<string> = ['s', 'm', 'l'];

/**
  * Получаем все ноды блока placeholder. Cмотрим несовпадения в размерах, если есть.
 */ 
export function lint(linter: Linter): void {
  const placeholders = linter.getNodesByBlock('placeholder');

  placeholders.forEach((placeholder: Node) => {
    const parentNode = linter.getParent(placeholder);
    if (placeholder.node.mods && placeholder.node.mods.size) {
      if (parentNode.node.block === 'warning' && !sizes.includes(placeholder.node.mods.size)) {
        linter.addError(placeholder.location, code, text); 
      }
    }
  });
}
