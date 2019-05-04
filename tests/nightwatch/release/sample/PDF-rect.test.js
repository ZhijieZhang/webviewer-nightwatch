describe('PDF Rect', function() {
  it('translate a PDF image by extracting and manipulating the image\'s media box', function(client) {
    client
      .loadSample('full-apis/RectTest')
      .getPDFBufferAfter('Done.', function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'PDF-rect.test.png');
      });
  });
});