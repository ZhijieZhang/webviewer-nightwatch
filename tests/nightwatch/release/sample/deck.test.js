describe('deck.js', function() {
  it('power deck.js slideshows', function(client) {
    client
      .loadSample('full-apis/DeckJSTest')
      .waitForElementPresent('#page0', 5000)
      .waitForElementPresent('#page1', 5000)
      .moveToElement('#page0', 50, 50)
      .waitForElementVisible('.deck-next-link', 5000)
      .click('.deck-next-link')
      // wait for the animation to be completed 
      .pause(2000)
      .assert.screenshot('.deck-container', 'deck.test.png');
  });
});