describe('Flipbook', function() {
  it('navigate to different pages', function(client) {
    client
      .loadSample('advanced/flipbook')
      .waitForElementVisible('#flipbook')
      .waitForElementVisible('.page.p3.odd', 15000)
      .click('#next')
      // wait for 1.5secs for the flipping animation to complete
      .pause(1500)
      .assert.screenshot('#flipbook', 'flipbook.png');
  });
});