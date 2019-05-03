describe('Custom annotations', function() {
  it('add custom ruler and stamp to the document', function(client) {
    client
      .loadSample('annotation/custom-annotations')
      .waitForWVEvent('pageComplete')
      .frameParent()
      .click('#ruler')
      .click('#custom-stamp')
      .switchToUIFrame()
      .moveToElement('.pageContainer', 100, 100)
      .mouseButtonClick('left')
      .click('[data-element="rulerToolButton"]')
      .moveToElement('.pageContainer', 100, 150)
      .mouseButtonDown('left')
      .moveToElement('.pageContainer', 300, 150)
      .mouseButtonUp('left')
      .assert.screenshot('.pageContainer', 'custom-annotation.png');
  });
});