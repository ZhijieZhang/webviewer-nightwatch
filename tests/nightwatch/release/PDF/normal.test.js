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

  it.only('fail to load with invalid license key', function(client) {
    client
      .frameParent()
      .execute(
        function() {
          window.WebViewer.l = () => 'TRIAL--3LpHUHAJUCXUakguywOTqFwW4SjaTDv61VlUiXuXSEpF18pRK8-tkLY05kJsIRSB2y6IGNfxLuxYgblIvWniA'
        }
      )
      .switchToUIFrame()
      .setUrlWithOptions({ initialDoc: '/samples/files/sample.pdf' })
      .waitForElementVisible('[data-element="errorModal"]')
  })
});