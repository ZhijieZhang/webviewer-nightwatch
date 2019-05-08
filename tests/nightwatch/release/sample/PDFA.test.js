describe('PDFA', function() {
  // TODO: double check it's not working
  it.only('verify if a document is PDFA and convert a PDF document to PDFA', function(client) {
    client
      .loadSample('full-apis/PDFATest')
      .waitForBuffer(1, function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'PDFA.test.png');
      });    
  });
});