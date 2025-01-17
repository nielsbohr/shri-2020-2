const code = 'TEXT.INVALID_H3_POSITION';
const error = 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.';

const data = [
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "text",
              "mods": {
                  "type": "h3"
              }
          },
          {
              "block": "text",
              "mods": {
                  "type": "h2"
              }
          }
      ]
  }`,
    expected: [
      {
        code,
        error,
        location: {
          end: {
            column: 12,
            line: 9,
          },
          start: {
            column: 11,
            line: 4,
          },
        },
      },
    ],
    length: 1,
    message: 'H3, H2',
  },
  {
    json: `{
      "block": "page",
      "content": [
          {
            "block": "text",
            "mods": {
                "type": "h3"
            }
          },
          {
            "block": "text",
            "mods": {
                "type": "h2"
            }
          },
          {
            "block": "text",
            "mods": {
                "type": "h3"
            }
          },
          {
            "block": "text",
            "mods": {
                "type": "h2"
            }
          }
      ]
  }`,
    expected: [
      {
        code,
        error,
        location: {
          end: {
            column: 12,
            line: 9,
          },
          start: {
            column: 11,
            line: 4,
          },
        },
      },
      {
        code,
        error,
        location: {
          end: {
            column: 12,
            line: 21,
          },
          start: {
            column: 11,
            line: 16,
          },
        },
      },
    ],
    length: 2,
    message: 'H3, H2, H3, H2',
  },
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "text",
              "mods": {
                  "type": "h2"
              }
          },
          {
            "block": "text",
            "mods": {
                "type": "h3"
            }
        },
        {
          "block": "text",
          "mods": {
              "type": "h3"
          }
        }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'H2, H3, H3',
  },
];

module.exports = {
  code,
  error,
  data,
};
