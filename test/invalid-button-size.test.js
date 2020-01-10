const code = 'WARNING.INVALID_BUTTON_SIZE';
const error = 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного.';

const data = [
  {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                    "block": "text",
                    "mods": {
                        "size": "l"
                    }
                  },
                  {
                      "block": "button",
                      "mods": {
                          "size": "s"
                      }
                  }
              ]
          }
      ]
    }`,
    expected: [
      {
        code,
        error,
        location: {
          end: {
            column: 20,
            line: 18,
          },
          start: {
            column: 19,
            line: 13,
          },
        },
      },
    ],
    length: 1,
    message: 'Incorrect button. Button is after Text',
  }, {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                      "block": "button",
                      "mods": {
                          "size": "s"
                      }
                  },
                  {
                      "block": "text",
                      "mods": {
                          "size": "l"
                      }
                  }
              ]
          }
      ]
    }`,
    expected: [
      {
        code,
        error,
        location: {
          end: {
            column: 20,
            line: 12,
          },
          start: {
            column: 19,
            line: 7,
          },
        },
      },
    ],
    length: 1,
    message: 'Incorrect button. Button is before text',
  }, {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                    "block": "text",
                    "mods": {
                        "size": "l"
                    }
                  },
                  {
                      "block": "button",
                      "mods": {
                          "size": "xl"
                      }
                  }
              ]
          }
      ]
    }`,
    expected: [],
    length: 0,
    message: 'Correct case. Button size is one more than Text size. Button is after Text',
  }, {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "warning",
              "content": [
                  {
                    "block": "button",
                    "mods": {
                        "size": "xl"
                    }
                  },
                  {
                    "block": "text",
                    "mods": {
                        "size": "l"
                    }
                  }
              ]
          }
      ]
    }`,
    expected: [],
    length: 0,
    message: 'Correct case. Button size is one more than Text size. Button is before Text',
  }, {
    json: `{
      "block": "page",
      "content": [
          {
              "block": "payment",
              "content": [
                  {
                    "block": "button",
                    "mods": {
                        "size": "l"
                    }
                  },
                  {
                    "block": "text",
                    "mods": {
                        "size": "l"
                    }
                  }
              ]
          }
      ]
    }`,
    expected: [],
    length: 0,
    message: 'Correct case. Button size is incorrect, but parent is not warning(payment). Button is before Text',
  },
];

module.exports = {
  code,
  error,
  data,
};
