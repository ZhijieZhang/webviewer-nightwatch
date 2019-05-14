module.exports = function(client) {
  return client.options.desiredCapabilities['browserstack.user'] === undefined;
};