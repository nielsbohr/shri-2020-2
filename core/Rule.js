module.exports = class Rule {
  /**
  * Инициализация скелета правила
  * @param {string} json JSON, как строка.
  */
  constructor(json) {
    this._json = json;
    this._errors = [];
  }

  /**
  * Проходим регуляркой по всем совпадениям, внутри совпадения реализуем логику правила.
  * @param {object} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {object} Объект JSON
  */
  lint() {
    this._regex = new RegExp(`"block"\\s*:\\s*"(${this._blocks.join('|')})"`, 'g');
    for (let n = 0; this._regex.test(this._json); n += 1) {
      this.check();
    }
  }

  /**
  * Парсим блок в JSON от указанных индексов начала и конца
  * @param {object} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {object} Объект JSON
  */
  parseBlock(loc) {
    return JSON.parse(this._json.slice(loc.start, loc.end + 1));
  }

  /**
  * Собираем локацию блока из двух индексов (начала и конца блока).
  * @param {integer} index индекс файла, от которого начинаем поиск.
  * @returns {object} Объект с ключами start и end
  */

  findBrackets(index = this._regex.lastIndex) {
    return {
      start: this.findBracket(index, true),
      end: this.findBracket(index, false),
    };
  }

  /**
  * Ищем начало/конец блока ( открывающую / закрывающую скобку текущего контекста ).
  * @param {integer} index индекс файла, от которого начинаем поиск.
  * @param {boolean} start ищем начало (true) или конец (false) блока.
  * @returns {integer} индекс начала или конца, либо -1,
  * если контекст нарушен (значит JSON невалиден).
  */

  findBracket(index, start) {
    for (
      let i = index, depth = 1;
      start ? i >= 0 : i < this._json.length;
      start ? i -= 1 : i += 1
    ) {
      switch (this._json[i]) {
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
  * @param {object} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {undefined}
  */
  addError(loc) {
    const info = this.getBlockInfo(loc);
    this._errors.push({
      code: this._code,
      error: this._text,
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
    });
  }

  /**
  * Подсчет количества строк и столбцов от указанного индекса,
  * путем разделения знаком переноса строки.
  * @param {object} loc локация блока, loc.start - начало файла, loc.end - конец файла.
  * @returns {object} Объект с ключами start и end,
  * в каждом ключе находится объект с ключами column и line.
  */

  getBlockInfo(loc) {
    const lineBreakG = new RegExp('\\r\\n?|\\n|\\u2028|\\u2029', 'g');

    for (let line = 1, cur = 0, start = {}, end = {}, offset = loc.start; ;) {
      lineBreakG.lastIndex = cur;
      const match = lineBreakG.exec(this._json);
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

        return {
          start: {
            column: start.column,
            line: start.line,
          },
          end: {
            column: end.column,
            line: end.line,
          },
        };
      }
    }
  }
};
