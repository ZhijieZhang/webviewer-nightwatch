const assert = require('assert');
const path = require('path');

describe('Page Operations', function() {
  beforeEach(function(client, done) {
    client
      .loadSample('pdf-manipulation/page-operations')
      .waitForWVEvent('pageComplete')
      .frameParent(function() {
        done();
      });
  });

  it('rotate a page', function(client) {
    client
      .click('#rotate')
      .switchToUIFrame()
      // not sure why in this case the document canvas isn't there after pageComplete event is triggered
      // so instead we wait explicitly for 3s here. Same situation applies to crop a page
      .waitForElementPresent('#pageContainer0 .auxiliary')
      .pause(3000)
      .assert.screenshot('.DocumentContainer', 'page-rotate.png');
  });

  it('crop a page', function(client) {
    client
      .click('#crop')
      .switchToUIFrame()
      .waitForElementPresent('#pageContainer0 .auxiliary')
      .pause(3000)
      .assert.screenshot('.DocumentContainer', 'page-crop.png');
  });

  it('delete a page', function(client) {
    client
      .click('#delete')
      // sometimes layoutChanged event is triggered before we switch to the UI frame
      // so we pause 1.5s here for the first page to be deleted. Same situation applies to merge a document
      .pause(1500)
      .switchToUIFrame()
      .readerControl('getPageCount', function(pageCount) {
        assert.equal(pageCount, 2);
      })
      .assert.screenshot('.DocumentContainer', 'page-delete.png');
  });  

  it('move a page', function(client) {
    client
      .click('#move-to option:nth-of-type(2)')
      .click('#move')
      .switchToUIFrame()
      .executeOnce({
        readerControl: ['setZoomLevel', 0.75],
        waitForWVEvent: ['pageComplete', 'pageComplete']
      })
      .assert.screenshot('.DocumentContainer', 'page-move.png');  
  });

  it('insert a blank page', function(client) {
    client
      .click('#insert')
      .switchToUIFrame()
      // pageComplete is triggered before switching into the UI frame so we wait for 2 seconds here instead of waiting for pageComplete
      .pause(2000)
      .assert.screenshot('.DocumentContainer', 'page-insert.png');  
  });

  it.skip('merge another document', function(client) {
    const samplePDF = path.resolve(__dirname, '../../../../samples/files/sample.pdf');

    client 
      .setValue('#file-picker', samplePDF)
      .pause(1000)
      .switchToUIFrame()
      .readerControl('getPageCount', function(pageCount) {
        assert.equal(pageCount, 5);
      })
      .readerControl('setZoomLevel', 0.75)
      .readerControl('setCurrentPageNumber', 4)
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.DocumentContainer', 'page-merge.png');
  });
});