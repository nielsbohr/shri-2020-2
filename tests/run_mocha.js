const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');

const mocha = new Mocha({
  reporter: 'list',
});

const testDir = __dirname;

fs.readdirSync(testDir)
  .filter((file) => path.extname(file) === '.js')
  .forEach((file) => {
    mocha.addFile(path.join(testDir, file));
  });

mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});
