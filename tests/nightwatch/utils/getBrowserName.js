module.exports = function(client) {
  return client.options.desiredCapabilities.browserName.toLowerCase();
};