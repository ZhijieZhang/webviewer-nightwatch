describe('Normal PDF', function() {
  it('load sample.pdf using constructor options', function(client) {
    client
      .setUrlWithOptions({ initialDoc: '/samples/files/sample.pdf' })
      .waitForWVEvent('pageComplete')
  });

  it('load sample.pdf using loadDocument API', function(client) {
    client
      .readerControl('loadDocument', '/samples/files/sample.pdf')
      .waitForWVEvent('pageComplete');
  });

  it('load sample.pdf, sample-annotated.pdf back and forth using loadDocument API', function(client) {
    client
      .readerControl('loadDocument', '/samples/files/sample.pdf')
      .waitForWVEvent('pageComplete')
      .readerControl('loadDocument', '/samples/files/sample-annotated.pdf')
      .waitForWVEvent('pageComplete')
      .readerControl('loadDocument', '/samples/files/sample.pdf')
      .waitForWVEvent('pageComplete')
      .readerControl('loadDocument', '/samples/files/sample-annotated.pdf')
      .waitForWVEvent('pageComplete');
  });
});