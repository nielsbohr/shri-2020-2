const fs = require('fs');
require('../index');
// require('../build/linter');

fs.readFile(`${__dirname}/jsons/index.json`, 'utf8', (err, str) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    const errors = lint(str);
    console.log(JSON.stringify(errors));
});