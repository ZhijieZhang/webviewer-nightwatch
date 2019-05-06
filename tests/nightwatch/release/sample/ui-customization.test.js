describe('UI Customization', function() {
  it('turns on/off serval UI customization', function(client) {
    client
      .loadSample('customization/ui')
      .waitForWVEvent('pageComplete')
      .frameParent()
      .click('#reverse')
      .click('#annotation')
      .click('#notes-panel')
      .click('#file-picker')
      .click('#print')
      .click('#download')
      .click('#view-controls')
      .click('#search')
      .click('#page-nav')
      .click('#dark')
      .switchToUIFrame()
      .readerControl('openElements', ['outlinesPanel'])
      // wait for the left panel to be fully open
      .pause(500)
      .click('[data-element="menuButton"]')
      .assert.screenshot('.App', 'ui-customization.png');
  });
});