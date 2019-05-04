describe('Text Search', function() {
  it('search text using strings and regex in a PDF document', function(client) {
    client
      .loadSample('full-apis/TextSearchTest')
      .waitForConsoleLog('Is the owner\'s name: Ben Franklin?');
  });
});