const code = 'WARNING.INVALID_BUTTON_POSITION';
const error = 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.';

const data = [
  {
    json: `{
    "block": "warning",
    "content": [
        {
            "block": "button",
            "mods": {
                "size": "xl"
            }
        },
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
                    "block": "placeholder",
                    "mods": {
                        "size": "m"
                    }
                }
            ]
        },
        {
            "block": "text",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "placeholder",
            "mods": {
                "size": "m"
            }
        },
        {
            "block": "button",
            "mods": {
                "size": "xl"
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
            column: 10,
            line: 9,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
      {
        code,
        error,
        location: {
          end: {
            column: 18,
            line: 18,
          },
          start: {
            column: 17,
            line: 13,
          },
        },
      },
    ],
    length: 2,
    message: 'Warning with incorrect button inside warning with incorrect button',
  },
  {
    json: `{
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
        },
        {
            "block": "placeholder",
            "mods": {
                "size": "m"
            }
        },
        {
            "block": "button",
            "mods": {
                "size": "xl"
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
            column: 10,
            line: 9,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
    ],
    length: 1,
    message: '1 incorrect button',
  },
  {
    json: `{
    "block": "warning",
    "content": [
        {
            "block": "text",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "placeholder",
            "mods": {
                "size": "m"
            }
        },
        {
          "block": "button",
          "mods": {
              "size": "xl"
          }
        },
        {
            "block": "button",
            "mods": {
                "size": "xl"
            }
        }
    ]
}`,
    expected: [],
    length: 0,
    message: 'Correct case. All buttons after placeholder',
  },
  {
    json: `{
    "block": "payment",
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
        },
        {
            "block": "placeholder",
            "mods": {
                "size": "m"
            }
        },
        {
            "block": "button",
            "mods": {
                "size": "xl"
            }
        }
    ]
}`,
    expected: [],
    length: 0,
    message: 'Incorrect button, but block is not warning (payment)',
  },
  {
    json: `{
      "block": "page",
      "content": [
        {
          "block": "button",
          "mods": {
              "size": "xl"
          }
        },
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
            },
            {
              "block": "placeholder",
              "mods": {
                  "size": "m"
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
            column: 14,
            line: 24,
          },
          start: {
            column: 13,
            line: 19,
          },
        },
      },
    ],
    length: 1,
    message: 'Incorrect button + 1 button outside warning block',
  },
  {
    json: `{
    "block": "warning",
    "content": [
        {
            "block": "history",
            "content": [
              {
                "block": "payment",
                "content": [
                  {
                    "block": "button"
                  }
                ]
              }
            ]
        },
        {
            "block": "placeholder"
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
            line: 10,
          },
        },
      },
    ],
    length: 1,
    message: 'Incorrect Button. It is 2 level nesting',
  },
];

module.exports = {
  code,
  error,
  data,
};
