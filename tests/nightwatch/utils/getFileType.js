module.exports = function(filePath) {
  return /\.xod(&|$|\?|#)/i.test(filePath) ? 'XOD' : 'PDF';
};