const code = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
const error = 'Маркетинговые блоки занимают больше половины от всех колонок блока grid.';

const data = [
  {
    json: `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "offer"
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
            column: 2,
            line: 32,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ],
    length: 1,
    message: '1 fail. 10 columns. 2 func, 8 offer',
  },
  {
    json: `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "5"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "5"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
}`,
    expected: [],
    length: 0,
    message: 'Correct. 10 columns. 5 func, 5 offer',
  },
  {
    json: `{
    "block": "grid",
    "mods": {
        "m-columns": "12"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "offer"
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
            column: 2,
            line: 32,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ],
    length: 1,
    message: 'Invalid. 12 columns. 8 func, 8 offer',
  },
];

module.exports = {
  code,
  error,
  data,
};
