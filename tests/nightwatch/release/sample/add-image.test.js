describe('Add Image', function() {
  it.only('embed various raster image formats in a PDF document', function(client) {
    client
      .loadSample('full-apis/AddImageTest')
      .waitForBuffer(1, function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .waitForElementNotVisible('[data-element="progressModal"]')
          .assert.screenshot('#pageContainer0', 'add-image-1.test.png')
          .readerControl('setCurrentPageNumber', 2)
          // can't wait for pageComplete event here since it's continuous mode
          // and the second page is already rendered, same applies to page 3
          .pause(500)
          .assert.screenshot('#pageContainer1', 'add-image-2.test.png')
          .readerControl('setCurrentPageNumber', 3)
          .pause(500)
          .assert.screenshot('#pageContainer2', 'add-image-3.test.png');
      });
  });
});