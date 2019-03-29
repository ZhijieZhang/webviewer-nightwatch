const { resolve } = require('path');

const importTests = paths => {
  paths.forEach(path => {
    require(resolve(__dirname, '../release/', path));
  })
};

module.exports = importTests;