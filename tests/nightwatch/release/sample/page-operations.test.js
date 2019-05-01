describe('Page Operations', function() {
  beforeEach(function(client, done) {
    client
      .loadSample('pdf-manipulation/page-operations')
      .waitForWVEvent('pageComplete')
      .frameParent(function() {
        done();
      });
  });

  it.only('rotate a page', function(client) {
    client
      .click('#rotate')
      .switchToUIFrame()
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.DocumentContainer', 'page-rotate.png');
  });
});