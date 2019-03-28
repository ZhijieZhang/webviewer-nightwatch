exports.command = function() {
  this.getAttribute('iframe', 'id', function(result) {
    this.frame(result.value);
  });

  return this;
}