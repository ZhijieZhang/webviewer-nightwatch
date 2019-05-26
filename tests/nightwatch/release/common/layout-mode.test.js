const getFileType = require('../../utils/getFileType');

module.exports = function(fileName) {
  const fileType = getFileType(fileName);

  describe('Layout Mode', function() {
    beforeEach(function(client, done) {
      client
        .readerControl('disableElements', ['pageNavOverlay'])
        // for some reasons if we don't pause for a short time here
        // the annotations will be invisible
        .pause(2000, done);
    });
  
    it('single', function(client) {
      client
        .readerControl('setLayoutMode', 'Single')
        .waitForElementNotPresent('#pageContainer1')
        .assert.screenshot('.DocumentContainer', `single-layout-mode.${fileType}.png`);
    });
  
    // other tests are all done in continuous mode so not sure what we should test here
    it.skip('continuous', function() {});
  
    it('facing', function(client) {
      client
        .executeOnce({
          readerControl: ['setLayoutMode', 'Facing'],
          waitForWVEvent: ['pageComplete', 'pageComplete']
        })
        .assert.screenshot('.DocumentContainer', `facing-layout-mode.${fileType}.png`);
    });
  
    it('facing continuous', function(client) {
      client 
        .executeOnce({
          readerControl: ['setLayoutMode', 'FacingContinuous'],
          waitForWVEvent: ['pageComplete', 'pageComplete', 'pageComplete']
        })
        .assert.screenshot('.DocumentContainer', `facing-continuous-layout-mode.${fileType}.png`);
    });
  
    it('cover facing', function(client) {
      client 
        .executeOnce({
          readerControl: ['setLayoutMode', 'CoverFacing'],
          waitForWVEvent: 'pageComplete'
        })
        .assert.screenshot('.DocumentContainer', `cover-facing-layout-mode.${fileType}.png`);
    });
  
    it('cover', function(client) {
      client 
        .executeOnce({
          readerControl: ['setLayoutMode', 'Cover'],
          waitForWVEvent: ['pageComplete', 'pageComplete', 'pageComplete']
        })
        .assert.screenshot('.DocumentContainer', `cover-layout-mode.${fileType}.png`);
    });
  });
};
