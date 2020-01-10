import { Linter } from '../Linter';
import { Node } from '../types';

const code: string = 'WARNING.INVALID_BUTTON_POSITION';
const text: string = `Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.`; 

/**
  * Ищем placeholders, чьи родители имеют значение блока warning.
  * Далее проходим по кнопкам и ищем те, что внутри дерева warning.
  */
export function lint(linter: Linter): void {
  const placeholders: Array<Node> = linter.getNodesByBlock('placeholder');
  const buttons: Array<Node> = linter.getNodesByBlock('button');

  placeholders.forEach((placeholder: Node) => {
    const parentNode: Node = linter.getParent(placeholder);

    if (parentNode.node.block === 'warning') {
      for (let i = buttons.length - 1; i >= 0; i -= 1) {
        if (linter.inScope(buttons[i], parentNode) 
        && buttons[i].location.end < placeholder.location.start) {
          linter.addError(buttons[i].location, code, text);
          buttons.splice(i, 1);
        }
      }
    }
  });
}
