describe('XFDF Import', function() {
  it('merge XFDF using PDFNet', function(client) {
    client
      .loadSample('full-apis/FDFTest')
      .waitForBuffer(1, function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'XFDF-import.test.png');
      });    
  });
});