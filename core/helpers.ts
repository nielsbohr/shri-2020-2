import { BlockLocation, Location, Index, LintError } from 'helpers';

export const helpers = {

  /**
  * Парсим блок в JSON от указанных индексов начала и конца
  * @param {string} json JSON в виде строки.
  * @param {oblect} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {object} Объект JSON
  */

  parseBlock(json: string, loc: Index): object {
    return JSON.parse(json.slice(loc.start, loc.end + 1));
  },

  /**
  * Собираем локацию блока из двух индексов (начала и конца блока).
  * @param {number} index индекс файла, от которого начинаем поиск.
  * @returns {Index} Объект с ключами start и end
  */

  findBrackets(index: number): Index {
    return {
      start: this.findBracket(index, true),
      end: this.findBracket(index, false),
    };
  },

  /**
  * Ищем начало/конец блока ( открывающую / закрывающую скобку текущего контекста ).
  * @param {number} index индекс файла, от которого начинаем поиск.
  * @param {boolean} start ищем начало (true) или конец (false) блока.
  * @returns {number} индекс начала или конца, либо -1,
  * если контекст нарушен (значит JSON невалиден).
  */

  findBracket(json : string, index : number, start : boolean) : number {
    for (
      let i = index, depth = 1;
      start ? i >= 0 : i < json.length;
      start ? i -= 1 : i += 1
    ) {
      switch (json[i]) {
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
  },

  /**
  * Добавление объекта ошибки в массив this._errors.
  * @param {Index} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @param {string} code код ошибки.
  * @param {string} error текст ошибки.
  * @returns {LintError}
  */
  createError(loc: Index, code: string, text: string): LintError {
    const info = this.getBlockInfo(loc);
    const error : LintError = {
        code: code,
        error: text,
        location: {
          start: {
            column: info.start.column,
            line: info.start.line,
          },
          end: {
            column: info.end.column,
            line: info.end.line,
          },
        },
      };
    return error;
  },

  /**
  * Подсчет количества строк и столбцов от указанного индекса,
  * путем разделения знаком переноса строки.
  * @param {Index} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {BlockLocation} Объект с ключами start и end,
  * в каждом ключе находится объект с ключами column и line.
  */

  getBlockInfo(json: string, loc: Index): BlockLocation {
    const lineBreakG = new RegExp('\\r\\n?|\\n|\\u2028|\\u2029', 'g');
    let block: BlockLocation;

    for (let line = 1,
        cur = 0, 
        start: Location, 
        end: Location, 
        offset: number = loc.start; ;) 
    {
      lineBreakG.lastIndex = cur;
      const match = lineBreakG.exec(json);
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
          start: {
            column: start.column,
            line: start.line,
          },
          end: {
            column: end.column,
            line: end.line,
          },
        };

        return block;
      }
    }
  }
};