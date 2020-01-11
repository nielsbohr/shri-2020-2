const code = 'TEXT.INVALID_H2_POSITION';
const error = 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.';

const data = [
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
                  "type": "h1"
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
    message: 'H2, H1',
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
                  "type": "h1"
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
                "type": "h1"
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
    length: 3,
    message: 'H2, H1, H2, H1',
  },
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "text",
              "mods": {
                  "type": "h1"
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
              "type": "h2"
          }
        }
      ]
  }`,
    expected: [],
    length: 0,
    message: 'H1, H2, H2',
  },
];

module.exports = {
  code,
  error,
  data,
};
