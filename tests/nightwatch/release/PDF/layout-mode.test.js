describe('Layout Mode', function() {
  beforeEach(function(client, done) {
    client
      .readerControl('disableElements', ['pageNavOverlay'])
      // for some reasons if we don't pause for a short time here
      // the annotations will be invisible
      .pause(500, done);
  });

  it('single', function(client) {
    client
      .readerControl('setLayoutMode', 'Single')
      .waitForElementNotPresent('#pageContainer1', 5000)
      .assert.screenshot('.DocumentContainer', 'single-layout-mode.test.png');
  });

  // other tests are all done in continuous mode so not sure what we should test here
  it('continuous', function() {});

  it('facing', function(client) {
    client
      .readerControl('setLayoutMode', 'Facing')
      .waitForElementNotPresent('#pageContainer2', 5000)
      .readerControl('setCurrentPageNumber', 3)
      .waitForWVEvent('pageComplete')
      .waitForElementPresent('#pageContainer2', 5000)
      .waitForElementPresent('#pageContainerb3', 5000)
      .readerControl('setCurrentPageNumber', 1)
      .waitForWVEvent('pageComplete')
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.DocumentContainer', 'facing-layout-mode.test.png');
  });

  it('facing continuous', function(client) {
    client 
      .readerControl('setLayoutMode', 'FacingContinuous')
      .waitForElementPresent('#pageContainerb3', 5000)
      .waitForWVEvent('pageComplete')
      .waitForWVEvent('pageComplete')
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.DocumentContainer', 'facing-continuous-layout-mode.test.png');
  });

  it('cover facing', function(client) {
    client 
      .readerControl('setLayoutMode', 'CoverFacing')
      .waitForElementPresent('#pageContainerb0', 5000)
      .readerControl('setCurrentPageNumber', 3)
      .waitForElementNotPresent('#pageContainerb0', 5000)
      .readerControl('setCurrentPageNumber', 1)
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.DocumentContainer', 'cover-facing-layout-mode.test.png');
  });

  it('cover', function(client) {
    client 
      .readerControl('setLayoutMode', 'Cover')
      .waitForElementPresent('#pageContainerb0', 5000)
      .waitForWVEvent('pageComplete')
      .waitForWVEvent('pageComplete')
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.DocumentContainer', 'cover-layout-mode.test.png');
  });
});