## Архитектура линтера

Точкой входа является src/index.ts, Линтер состоит из:
- Класса линтера с его методами, которые необходимы при парсинге json должным образом по необходимым правилам, создания ошибок и прочее.
- Правил, которые описаны в src/rules/*, каждое правило изолировано друг от друга, неважно к какой тематике оно относится ( Warning, Text, Grid )

Проверка правил, поиск нужных блоков происходит путем регулярных выражений, поиска фигурных скобок, как начала, так и конца блока. Парсинг всего json файла как AST слишком дорого и не является необходимостью. Для данных конкретных правил достаточно использование регулярных выражений.

Каждое правило проходит заново по всей строке. Это можно оптимизировать, экономя каждый раз проходы регулярными выражениями, но нужно сильно менять архитектуру, и код станет много запутаннее. Сейчас же каждое правило изолировано друг от друга и никак между собой не контактирует, это удобно.

## Структура правил

```
const code: string = 'TEXT.INVALID_H2_POSITION'; // код ошибки
const text: string = 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.'; // сообщение

// правило получает на вход экземпляр Линтера, чтобы пользоваться его методами
export function lint(linter: Linter): void {
  const nodes = linter.getNodesByBlock('text'); // получение всех нод, у которых значение блока 'text'
  ...
}
```

## Команды

`npm run dev` - Сборка бандла с включенной опцией watch \
`npm test` - Прогон тестов через Node.js \
`npm run devtest` - Прогон тестов через браузер

## ToDo

тайпы Node
while вместо fot
комментарии
проверить кэш