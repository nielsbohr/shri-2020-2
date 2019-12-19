### Структура правил:

Находятся по адресу ```./core/rules/*Название правила*```

```
  this._blocks = ['placeholder', 'button']; // необходимые блоки для парсинга
  this._code = 'WARNING.INVALID_BUTTON_POSITION'; // группа и код ошибки
  this._text = 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.'; // текст ошибки

  check(scope) {
      // логика правила
  }
};

```