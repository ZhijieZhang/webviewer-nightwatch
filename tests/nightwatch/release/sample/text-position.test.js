describe('Text Position', function() {
  const text = 'this';

  it(`select ${text} in the first page`, function(client) {
    client
      .loadSample('advanced/text-position')
      .waitForWVEvent('pageComplete')
      .frameParent()
      .clear('#text')
      .setValue('#text', text)
      .click('#page-0')
      .switchToUIFrame()
      .waitForWVEvent('annotManager', 'annotationSelected')
      .assert.screenshot('.pageContainer', 'text-position.test.png');
  });
});