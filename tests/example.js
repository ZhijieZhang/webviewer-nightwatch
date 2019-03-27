describe('Can run', function() {
  it('load viewing sample', function(browser) {
    browser
      // .url('http://192.168.1.72:3000/samples/viewing/viewing')
      .url('http://localhost:3000/samples/viewing/viewing')
      .waitForElementVisible('body', 1000)
      .pause(30000)
      .end();
  })
})