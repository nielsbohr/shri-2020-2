## Архитектура линтера

Точкой входа является index.js, внутри подгружаются пути до файлов всех правил, указаные в rules.js. После этого на каждое правило создается экземпляр класса данного правила, передается json, как строка, на выходе отдается массив ошибок.

Проверка правил, поиск нужных блоков происходит путем регулярных выражений, поиска фигурных скобок, как начала и конца блока. Постройка всего json в виде строки, как AST слишком дорого. Регулярками лучше и быстрее. если регулярка сломалась, и не смогла спарсить блок, значит json невалидный.

Каждое правило проходит заново по всей строке. Это можно оптимизировать, экономя каждый раз проходы регуляркой, но нужно сильно менять архитектуру, и код станет много запутаннее. Сейчас же каждое правило изолировано друг от друга и никак между собой не контактирует, это удобно.

## Структура правил

Адреса правил указаны в ./rules.js

```
  this._blocks = ['placeholder', 'button']; // необходимые блоки для парсинга
  this._code = 'WARNING.INVALID_BUTTON_POSITION'; // группа и код ошибки
  this._text = 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.'; // текст ошибки

  check(scope) {
      // логика правила
  }
};
```

# ToDo

* Exceptions
* Docs
* More tests