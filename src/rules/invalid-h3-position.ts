import { Linter } from "../Linter";
import { Node } from '../types';

const code: string = 'TEXT.INVALID_H3_POSITION';
const text: string = 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.';

export function lint(linter: Linter): void {
  const nodes = linter.getNodesByBlock('text');
  const allH2 = nodes.filter((node: Node) => node.node && node.node.mods && node.node.mods.type === 'h2');
  const allH3 = nodes.filter((node: Node) => node.node && node.node.mods && node.node.mods.type === 'h3');
  let h2: Node;
  if (allH2.length) {
    h2 = allH2[0];
    allH3.forEach((node: Node) => {
      if (node.location.end < h2.location.start) { linter.addError(node.location, code, text); }
    });
  }
}
