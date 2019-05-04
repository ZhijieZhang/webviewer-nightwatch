describe('Text Search', function() {
  it.only('search text using strings and regex in a PDF document', function(client) {
    client
      .loadSample('full-apis/TextSearchTest')
      .waitForConsoleLog('Is the owner\'s name: Ben Franklin?');
  });
});