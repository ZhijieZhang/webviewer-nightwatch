describe('PDF Layer', function() {
  // TODO: double check it's not working
  it.skip('create PDF layers and extract PDF layers', function(client) {
    client
      .loadSample('full-apis/PDFLayersTest')
      .getPDFBufferAfter([
        'done example 1',
        'done'
      ], function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'PDF-draw.test.png');
      });    
  });
});