describe('Invalid License Key', function() {
  it.only('fail to load with invalid license key', function(client) {
    client
      .frameParent()
      .execute(
        function() {
          window.WebViewer.l = () => 'TRIAL--3LpHUHAJUCXUakguywOTqFwW4SjaTDv61VlUiXuXSEpF18pRK8-tkLY05kJsIRSB2y6IGNfxLuxYgblIvWniA';
        }
      )
      .switchToUIFrame()
      .setUrlWithOptions({ 
        initialDoc: '/samples/files/sample.pdf'
      })
      .waitForElementVisible('[data-element="errorModal"]', 15000)
      .expect.element('[data-element="errorModal"] .container').text.to.contain('Bad License Key');
  });
});