module.exports = function(fileName) {
  return /\.xod(&|$|\?|#)/i.test(fileName) ? 'XOD' : 'PDF';
};