## Архитектура линтера

Точкой входа является src/index.ts, Линтер состоит из:
- Класса линтера с его методами, которые необходимы при парсинге json должным образом по необходимым правилам, создания ошибок и прочее.

  - Проверка правил происходит в первую очередь путем поиска нужных типов блоков( "block": "text" ) с помощью регулярных выражений. 
  - Затем поиска фигурных скобок, как начала, так и конца блока для парсинга этого куска строки в JSON. 
  - После каждого поиска блока определенного типа - создается кэш, чтобы при повторном поиске не искать заново, а отдавать кэш. Кстати судя по тестам - это не сильно играет роли. Надо проверять на больших JSON-ах. 
  - Парсинг всего JSON файла как AST слишком дорого и не является необходимостью. Для данных конкретных правил достаточно использование регулярных выражений.

- Правил, которые описаны в src/rules/*, каждое правило изолировано друг от друга

## Структура правил

```
const CODE: string = 'TEXT.INVALID_H2_POSITION'; // код ошибки
const MESSAGE: string = 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.'; // сообщение

// правило получает на вход экземпляр Линтера, чтобы пользоваться его методами
export function lint(linter: Linter): void {
  const nodes = linter.getNodesByBlock('text'); // получение всех нод, у которых значение блока 'text'
  ...
}
```

## Команды

`npm run dev` - Автоборка бандла через HMR \
`npm test` - Прогон тестов через Node.js \
`npm run devtest` - Прогон тестов через браузер \
