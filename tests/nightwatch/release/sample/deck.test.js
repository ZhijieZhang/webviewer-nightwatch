describe.only('deck.js', function() {
  it('power deck.js slideshows', function(client) {
    client
      .loadSample('full-apis/DeckJSTest')
      .waitForElementPresent('#page0')
      .waitForElementPresent('#page1')
      .moveToElement('#page0', 50, 50)
      .waitForElementVisible('.deck-next-link')
      .click('.deck-next-link')
      // wait for the animation to be completed 
      .pause(2000)
      .assert.screenshot('.deck-container', 'deck.test.png');
  });
});