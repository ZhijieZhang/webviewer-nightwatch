// this command is a workaround for the native clearValue API
// https://github.com/nightwatchjs/nightwatch/issues/1132
exports.command = function(element, callback = () => {}) {
  this.getValue(element, function({ value }) {
    for (let c in value) {
      this.setValue(element, this.Keys.BACK_SPACE);
    }

    callback.call(this);
  }.bind(this));

  return this;
};