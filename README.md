### Структура правил:

Назодятся по адресу ```./groups/*Название группы*/rules/*Название правила*```

```
module.exports = {
  blocks: ['button', 'placeholder'], // необходимые блоки
  group: 'warning', // группа правила
  text: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.', // текст ошибки
  code: 'INVALID_BUTTON_POSITION', // код ошибки
  loc: 'elements', // локацию ошибки (группа, элемент)

  check(scope) {
      // логика правила
  }
};

```