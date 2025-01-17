import { Linter } from "../Linter";
import { Node } from '../types';

const CODE: string = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';
const MESSAGE: string = 'Блок Warning содержит тексты разных размеров.';

export function lint(linter: Linter): void {
  const texts: Array<Node> = linter.getNodesByBlock('text');
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
        if (!warning.text) {
          warning.text = text.node.mods.size;
        } else if (warning.text && text.node.mods.size !== warning.text) {
          linter.addError(warning.location, CODE, MESSAGE);
          break;
        }
      }
    }
  }
}