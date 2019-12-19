const fs = require('fs');
const { deepEqual } = require('assert');
const { lint } = require('../index');

const json = fs.readFileSync(`${__dirname}/jsons/warning/invalid-button-position.json`, 'utf8');
// const expected = [
//   {
//     code: 'WARNING.INVALID_BUTTON_POSITION',
//     error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.',
//     location: {
//       end: {
//         column: 18,
//         line: 12,
//       },
//       start: {
//         column: 17,
//         line: 7,
//       },
//     },
//   },
// ];

const expected = [];

describe('INVALID_BUTTON_POSITION', () => {
  it('Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.', () => {
    deepEqual(lint(json), expected);
  });
});
