describe('PDF Layer', function() {
  // TODO: double check it's not working
  it.skip('create PDF layers and extract PDF layers', function(client) {
    client
      .loadSample('full-apis/PDFLayersTest')
      .waitForBuffer(2, function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'PDF-draw.test.png');
      });    
  });
});