describe('Element Reader', function() {
  it('traverse page display list using ElementReader', function(client) {
    client
      .loadSample('full-apis/ElementReaderTest')
      .waitForConsoleLog('Done.', 1000000);
  });
});