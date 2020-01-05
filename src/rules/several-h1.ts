import { Linter } from '../Linter';
import { Node } from '../types';

const code: string = 'TEXT.SEVERAL_H1';
const text: string = 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.';

export function lint(linter: Linter): void {
  const allH1 = linter
    .getNodesByBlock('text')
    .filter((node: Node) => node.node && node.node.mods && node.node.mods.type === 'h1');

  if (allH1.length > 0) {
    allH1.shift();
    allH1.forEach((node: Node) => {
      linter.addError(node.location, code, text);
    });
  }
}
