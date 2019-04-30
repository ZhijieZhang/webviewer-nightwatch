const { resolve } = require('path');

const importTests = paths => {
  paths.forEach(path => {
    if (Array.isArray(path)) {
      const [filePath, ...args] = path;
      require(resolve(__dirname, '../release/', filePath))(...args);
    } else if (typeof path === 'string') {
      require(resolve(__dirname, '../release/', path));
    }
  });
};

module.exports = importTests;