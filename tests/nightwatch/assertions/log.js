exports.assertion = function(text, message) {
  this.message = message || `${text} isn't logged in the browser's console`;
  
  this.expected = true;

  this.pass = function(value) {
    return value;
  };

  this.value = function(result) {
    return result;
  };

  this.command = function(callback) {
    this.api
      .getLog('browser', function(logs) {
        for (let log of logs) {
          if (log.message.includes(text)) {
            return callback(true);
          }
        }

        callback(false);
      });

    return this;
  };
};