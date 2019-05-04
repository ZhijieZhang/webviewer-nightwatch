describe('Text Extract', function() {
  it('extract information from text boxes such as their position, font, size, color and the text', function(client) {
    client
      .loadSample('full-apis/TextExtractTest')
      .waitForConsoleLog('done', 1000000);
  });
});