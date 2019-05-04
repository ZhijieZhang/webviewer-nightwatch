describe('PDF Redaction', function() {
  it('create Redaction objects and use PDFNetJS redact function to remove and overlay PDF document content', function(client) {
    client
      .loadSample('full-apis/PDFRedactTest')
      .getPDFBufferAfter('done', function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .readerControl('setLayoutMode', 'Single')
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'PDF-redaction-1.test.png')
          .readerControl('setCurrentPageNumber', 2)
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'PDF-redaction-2.test.png');
      });
  });
});