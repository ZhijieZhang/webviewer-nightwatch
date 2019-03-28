describe('Load PDF', function() {
  it('Normal PDF', function(client) {
    client
      .url('http://localhost:3000/samples/viewing/viewing')
      .waitForElementVisible('iframe', 1000)
      .switchToUIFrame()
      .waitForWVEvent('pageComplete')
      .readerControl('setCurrentPageNumber', 3)
      .waitForWVEvent('pageComplete')
      .end();
  });
})