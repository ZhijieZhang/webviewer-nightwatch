describe('Add Image', function() {
  it.only('embed various raster image formats in a PDF document', function(client) {
    client
      .loadSample('full-apis/AddImageTest')
      .getPDFBufferAfter('Done. Result saved as addimage.pdf', function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .pause(300000);
      });
  });
});