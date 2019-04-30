describe('Non-linearized PDF', function() {
  it('load non-linearized.pdf', function(client) {
    client
      .readerControl('loadDocument', '/samples/files/non-linearized.pdf')
      .waitForWVEvent('pageComplete');
  });
});