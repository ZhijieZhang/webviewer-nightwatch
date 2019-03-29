describe('PDF with substituted fonts', function() {
  it('load font-substituted.pdf', function(client) {
    client
      .readerControl('loadDocument', '/samples/files/font-substituted.pdf')
      .waitForWVEvent('pageComplete');
  });
})