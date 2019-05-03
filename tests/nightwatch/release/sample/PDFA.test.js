describe('PDFA', function() {
  // TODO: double check it's not working
  it.skip('verify if a document is PDFA and convert a PDF document to PDFA ', function(client) {
    client
      .loadSample('full-apis/PDFATest')
      .getPDFBufferAfter([
        'newsletter.pdf is NOT a valid PDFA.',
        'fish.pdf is NOT a valid PDFA.',
        'fish_pdfa.pdf is a valid PDFA.'
      ], function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'PDFA.test.png');
      });    
  });
});