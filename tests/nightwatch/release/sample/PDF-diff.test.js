describe('PDF Diff', function() {
  it('diff two PDF files', function(client) {
    client
      .loadSample('full-apis/ViewerPDFDiffTest')
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.pageContainer', 'pdf-diff.test.png');
  });
});