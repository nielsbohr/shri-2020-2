import { Linter } from './Linter';
import { LintError } from './types';
import rules from './rules';

 /* Входная точка. Импорт правил. Создание экземпляра линтера.
  * Проход по правилам, наполнение линтера ошибками. Возвращение массива ошибок.
  * Привязка функции к window/global
  */

export function lint(json: string): Array<LintError> | Error {
  if (typeof json !== 'string') { throw new Error('JSON is not string'); }
  const linter = new Linter(json);

  rules.forEach((rule) => {
    rule().lint(linter);
  });
  
  return linter.errors;
}

let _global: any;
if (typeof window === "undefined") {
  _global = global;
} else {
  _global = window;
}
_global.lint = lint;