describe('Office To PDF', function() {
  // TODO: double check it's not working
  it.skip('convert office files to PDF using PDFNetJS', function(client) {
    client
      .loadSample('full-apis/OfficeToPDFTest')
      .waitForBuffer(3, function(buffers) {
        const screenshotNames = [
          'office-to-pdf-docx.test.png',
          'office-to-pdf-pptx.test.png',
          'office-to-pdf-xlsx.test.png',
        ];

        buffers.forEach(function(buffer, index) {
          client
            .loadSample('viewing/viewing', {
              buffer
            })
            .waitForWVEvent('pageComplete')
            .assert.screenshot('.pageContainer', screenshotNames[index]);
        });
      });    
  });
});