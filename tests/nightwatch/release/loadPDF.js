describe('Load PDF', function() {
  it('Normal PDF', function(client) {
    client
      .url('http://localhost:3000/samples/viewing/viewing')
      .waitForElementVisible('iframe', 1000)
      .waitForWVEvent('pageComplete')
      .readerControl('setCurrentPageNumber', 3)
      .pause(30000)
      .end();
  })
})