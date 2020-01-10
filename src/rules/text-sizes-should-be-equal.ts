import { Linter } from "../Linter";
import { Node, Warning } from '../types';

const code: string = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';
const message: string = 'Блок Warning содержит тексты разных размеров.';

/**
  * В нодах блока warning проходимся по нодам блока текст и ищем первое совпадение,
  *  остальные ноды блока текст не того размера выкидываем в ошибку
 */ 
export function lint(linter: Linter): void {
  const texts: Array<Node> = linter.getNodesByBlock('text');
  const warnings: Array<Warning> = linter.getNodesByBlock('warning');
  
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
          linter.addError(warning.location, code, message);
          break;
        }
      }
    }
  }
}