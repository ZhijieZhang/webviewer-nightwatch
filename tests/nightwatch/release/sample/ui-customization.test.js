describe('UI Customization', function() {
  it('turns on/off serval UI customization', function(client) {
    client
      .loadSample('customization/ui')
      .waitForWVEvent('pageComplete')
      .frameParent()
      .click('#reverse')
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
      .click('[data-element="menuButton"]')
      // wait for the left panel to be fully open
      .pause(1000)
      .assert.screenshot('.App', 'ui-customization.png');
  });
});