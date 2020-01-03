export interface LintError {
  code: string;
  error: string;
  location: BlockLocation;
}

export interface BlockLocation {
  start: Location;
  end: Location;
}

export interface Location {
  column: number;
  line: number;
}

export interface BlockIndexes {
  start: number;
  end: number;
}

export class Linter {
  /**
  * Инициализация скелета правила
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
  * @param {BlockIndexes} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {object} Объект JSON
  */

  parseBlock(loc: BlockIndexes): any {
    return JSON.parse(this.json.slice(loc.start, loc.end + 1));
  }

  /**
  * Собираем локацию блока из двух индексов (начала и конца блока).
  * @param {number} index индекс файла, от которого начинаем поиск.
  * @returns {BlockIndexes} Объект с ключами start и end
  */

  findBrackets(index: number): BlockIndexes {
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

    return -1;
  }

  /**
  * Добавление объекта ошибки в массив this._errors.
  * @param {BlockIndexes} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @param {string} code код ошибки.
  * @param {string} error текст ошибки.
  * @returns {LintError}
  */
  addError(loc: BlockIndexes, code: string, text: string): void {
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
  * @param {BlockIndexes} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {BlockLocation} Объект с ключами start и end,
  * в каждом ключе находится объект с ключами column и line.
  */

  getBlockInfo(loc: BlockIndexes): BlockLocation {
    const lineBreakG = new RegExp('\\r\\n?|\\n|\\u2028|\\u2029', 'g');
    let block: BlockLocation;

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
