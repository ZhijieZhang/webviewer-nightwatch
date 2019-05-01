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
      .waitForWVEvent('pageComplete')
      // not sure why in this case the document canvas isn't there after pageComplete event is triggered
      // so we wait explicitly for 1s here. Same situation applies to crop a page
      .pause(1500)
      .assert.screenshot('.DocumentContainer', 'page-rotate.png');
  });

  it('crop a page', function(client) {
    client
      .click('#crop')
      .switchToUIFrame()
      .waitForWVEvent('pageComplete')
      .pause(1500)
      .assert.screenshot('.DocumentContainer', 'page-crop.png');
  });

  it('delete a page', function(client) {
    client
      .click('#delete')
      .switchToUIFrame()
      .waitForWVEvent('layoutChanged')
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
      .readerControl('setZoomLevel', 0.75)
      .waitForWVEvent('pageComplete')
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.DocumentContainer', 'page-move.png');  
  });

  it('insert a blank page', function(client) {
    client
      .click('#insert')
      .switchToUIFrame()
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.DocumentContainer', 'page-insert.png');  
  });

  it('merge another document', function(client) {
    const samplePDF = path.resolve(__dirname, '../../../../samples/files/sample.pdf');

    client 
      .click('#file-picker')
      .setValue('#file-picker', samplePDF)
      .switchToUIFrame()
      .waitForWVEvent('pageComplete')
      .readerControl('getPageCount', function(pageCount) {
        assert.equal(pageCount, 5);
      })
      .readerControl('setZoomLevel', 0.75)
      .readerControl('setCurrentPageNumber', 4)
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.DocumentContainer', 'page-merge.png');
  });
});