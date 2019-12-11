const fs = require('fs');
const lint = require('../index');

fs.readFile(`${__dirname}/jsons/index.json`, 'utf8', (err, str) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    lint(str);
});