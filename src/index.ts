import { Linter } from './Linter';
import rules from './rules';

export function lint(json: string) {
  if (typeof json !== 'string') { throw new Error('JSON is not string'); }
  const linter = new Linter(json);

  rules.forEach((rule) => {
    rule().lint(linter);
  });
  
  return linter.errors;
}

Object.defineProperty(global, 'lint', lint);
