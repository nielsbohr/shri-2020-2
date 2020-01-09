import { LintError, NodeIndexes, Node, NodeLocation, Location } from './types';

export class Linter {
  /**
  * Инициализация линтера
  * @param {string} json JSON, как строка.
  */
  _json: string;
  _errors: Array<LintError>;
  constructor(json: string) {
    try {
      JSON.parse(json);
    } catch (e) {
      if (e instanceof SyntaxError) { 
        throw new Error('JSON is not valid');
      } else {
        throw new Error(e);
      }
    }
    this._json = json;
    this._errors = [];
  }

  get errors(): Array<LintError> {
    return this._errors;
  }
  
  get json() {
    return this._json;
  }
  
  /**
  * Парсим блок в JSON от указанных индексов начала и конца
  * @param {NodeIndexes} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {object} Объект JSON
  */
  parseBlock(loc: NodeIndexes): any {
    try {
      const json = JSON.parse(this.json.slice(loc.start, loc.end + 1));
      return json; 
    } catch(e) {
      throw new Error('JSON parser throwed error');
    }
  }

  
  /**
  * Получения всех нод по типу блока
  * @param {string} type тип блока
  * @param {string} NodeLocation субстрока, по дефолту весь JSON
  * @returns {Array<any>}
  */
  getNodesByBlock(type: string, NodeLocation: string = this.json): Array<any> {
    const nodes = [];
    const regex = new RegExp(`"block"\\s*:\\s*"${type}"`, 'g');
    for (let n = 0, location: NodeIndexes; regex.test(NodeLocation); n += 1) {
      location = this.findBrackets(regex.lastIndex);
      nodes.push(
        {
          node: this.parseBlock(location),
          location
        }
      );
    }

    return nodes;
  }

  
  /**
  * Получения ноды родителя
  * @param {Node} child нода
  * @returns {Node} нода-родитель
  */
  getParent(child: Node): Node {
    const location = this.findBrackets(child.location.start - 1);

    return {
      node: this.parseBlock(location),
      location
    };
  }

  /**
  * Находится ли нода внутри уровня и подуровней ноды родителя
  * @param {Node} child нода-ребенок
  * @param {Node} parent нода-родитель (не обязательно на 1 уровень выше, может и на 2, 3 и т.д.)
  * @returns {boolean}
  */
  inScope(child: Node, parent: Node): boolean {
    return child.location.start > parent.location.start && child.location.end < parent.location.end;
  }

  /**
  * Является ли нода строго родителем другой ноды
  * (является ли ребенок частью content родителя)
  * @param {Node} child нода-ребенок
  * @param {Node} parent нода-родитель
  * @returns {boolean}
  */
  isParent(child: Node, parent: Node): boolean {
    return this.getParent(child).location.start === parent.location.start &&
      this.getParent(child).location.end === parent.location.end;
  }

  /**
  * Собираем локацию блока из двух индексов (начала и конца блока).
  * @param {number} index индекс файла, от которого начинаем поиск.
  * @returns {NodeIndexes} Объект с ключами start и end
  */
  findBrackets(index: number): NodeIndexes {
    return {
      start: this.findBracket(index, true),
      end: this.findBracket(index, false),
    };
  }

  /**
  * Ищем начало/конец блока ( открывающую / закрывающую скобку текущего контекста ).
  * @param {number} index индекс файла, от которого начинаем поиск.
  * @param {boolean} start ищем начало (true) или конец (false) блока.
  * @returns {number} индекс начала или конца, либо -1,
  * если контекст нарушен (значит JSON невалиден).
  */
  findBracket(index : number, start : boolean) : number {
    for (
      let i = index, depth = 1;
      start ? i >= 0 : i < this.json.length;
      start ? i -= 1 : i += 1
    ) {
      switch (this.json[i]) {
        case start ? '}' : '{':
          depth += 1;
          break;
        case start ? '{' : '}':
          depth -= 1;
          if (depth === 0) {
            return i;
          }
          break;
        default:
          break;
      }
    }

    throw new Error('Can\'t find location offset');
  }

  /**
  * Добавление объекта ошибки в массив this._errors.
  * @param {NodeIndexes} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @param {string} code код ошибки.
  * @param {string} error текст ошибки.
  * @returns {LintError}
  */
  addError(loc: NodeIndexes, code: string, text: string): void {
    const info = this.getBlockInfo(loc);
    const error : LintError = {
        code: code,
        error: text,
        location: {
          start: info.start,
          end: info.end
        },
      };
    this._errors.push(error);
  }

  /**
  * Подсчет количества строк и столбцов от указанного индекса,
  * путем разделения знаком переноса строки.
  * @param {NodeIndexes} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {NodeLocation} Объект с ключами start и end,
  * в каждом ключе находится объект с ключами column и line.
  */
  getBlockInfo(loc: NodeIndexes): NodeLocation {
    const lineBreakG = new RegExp('\\r\\n?|\\n|\\u2028|\\u2029', 'g');
    let block: NodeLocation;

    for (let line = 1,
        cur = 0, 
        start: Location = Object.create({}), 
        end: Location = Object.create({}), 
        offset: number = loc.start; ;) 
    {
      lineBreakG.lastIndex = cur;
      const match = lineBreakG.exec(this.json);
      if (match && match.index < offset) {
        line += 1;
        cur = match.index + match[0].length;
      } else if (offset === loc.start) {
        start.column = offset - cur + 1;
        start.line = line;
        offset = loc.end;
      } else {
        end.column = offset - cur + 2;
        end.line = line;

        block =  {
          start,
          end
        };

        return block;
      }
    }
  }
}
