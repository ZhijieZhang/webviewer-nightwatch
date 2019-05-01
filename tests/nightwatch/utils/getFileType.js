module.exports = function(fileName) {
  if (/\.xod(&|$|\?|#)/i.test(fileName)) {
    return 'XOD';
  }

  if (/\.pdf(&|$|\?|#)/i.test(fileName)) {
    return 'PDF';
  }

  return 'other';
};