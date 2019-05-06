const getFileType = require('../../utils/getFileType');

module.exports = function(fileName) {
  const fileType = getFileType(fileName);

  describe.only('Layout Mode', function() {
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
        .waitForElementNotPresent('#pageContainer1')
        .assert.screenshot('.DocumentContainer', `single-layout-mode.${fileType}.png`);
    });
  
    // other tests are all done in continuous mode so not sure what we should test here
    it('continuous', function() {});
  
    it('facing', function(client) {
      client
        .readerControl('setLayoutMode', 'Facing')
        .waitForElementNotPresent('#pageContainer2')
        .readerControl('setCurrentPageNumber', 3)
        .waitForWVEvent('pageComplete')
        .waitForElementPresent('#pageContainer2')
        .waitForElementPresent('#pageContainerb3')
        .readerControl('setCurrentPageNumber', 1, function() {
          if (fileType === 'PDF') {
            client
              .waitForWVEvent('pageComplete')
              .waitForWVEvent('pageComplete');
          } else if (fileType === 'XOD') {
            // it seems for XOD files pageComplete events will be triggered too early so we can't catch it using waitForWVEvent
            // as a workaround we wait for 500ms here, assuming pages will be rendered in 500ms
            // the same reason applies to all the layout modes below
            client.pause(500);
          }
        })
        .assert.screenshot('.DocumentContainer', `facing-layout-mode.${fileType}.png`);
    });
  
    it('facing continuous', function(client) {
      client 
        .readerControl('setLayoutMode', 'FacingContinuous')
        .waitForElementPresent('#pageContainerb3', function() {
          if (fileType === 'PDF') {
            client
              .waitForWVEvent('pageComplete')
              .waitForWVEvent('pageComplete')
              .waitForWVEvent('pageComplete');
          } else if (fileType === 'XOD') {
            client.pause(500);
          }
        })
        .assert.screenshot('.DocumentContainer', `facing-continuous-layout-mode.${fileType}.png`);
    });
  
    it('cover facing', function(client) {
      client 
        .readerControl('setLayoutMode', 'CoverFacing')
        .waitForElementPresent('#pageContainerb0')
        .readerControl('setCurrentPageNumber', 3)
        .waitForElementNotPresent('#pageContainerb0')
        .readerControl('setCurrentPageNumber', 1, function() {
          if (fileType === 'PDF') {
            client.waitForWVEvent('pageComplete');
          } else if (fileType === 'XOD') {
            client.pause(500);
          }
        })
        .assert.screenshot('.DocumentContainer', `cover-facing-layout-mode.${fileType}.png`);
    });
  
    it('cover', function(client) {
      client 
        .readerControl('setLayoutMode', 'Cover')
        .waitForElementPresent('#pageContainerb0', function() {
          if (fileType === 'PDF') {
            client
              .waitForWVEvent('pageComplete')
              .waitForWVEvent('pageComplete')
              .waitForWVEvent('pageComplete');
          } else if (fileType === 'XOD') {
            client.pause(500);
          }
        })
        .assert.screenshot('.DocumentContainer', `cover-layout-mode.${fileType}.png`);
    });
  });
};
