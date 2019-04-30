exports.command = function(callback = () => {}) {
  this.getAttribute('iframe', 'id', function(result) {
    this.frame(result.value, function() {
      callback.call(this);
    });
  });

  return this;
};