describe('PDF Draw', function() {
  // TODO: double check it's not working
  it.skip('use the built-in rasterizer to render PDF images on the fly and save resulting images in PNG and JPEG format', function(client) {
    client
      .loadSample('full-apis/PDFDrawTest')
      .waitForBuffer(1, function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'PDF-draw.test.png');
      });    
  });
});