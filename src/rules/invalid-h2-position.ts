import { Linter } from "../Linter";
import { Node } from '../types';

const CODE: string = 'TEXT.INVALID_H2_POSITION';
const MESSAGE: string = 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.';

/**
  * Получаем все ноды блока текст, фильтруем по заголовкам. Далее смотрим несовпадения в позициях
 */ 
export function lint(linter: Linter): void {
  const nodes = linter.getNodesByBlock('text');
  const allH1 = nodes.filter((node: Node) => node.node.mods && node.node.mods.type === 'h1');
  const allH2 = nodes.filter((node: Node) => node.node.mods && node.node.mods.type === 'h2');
  let h1: Node;
  if (allH1.length > 0) {
    h1 = allH1[allH1.length - 1];
    allH2.forEach((node: Node) => {
      if (node.location.end < h1.location.start) { linter.addError(node.location, CODE, MESSAGE); }
    });
  }
}
