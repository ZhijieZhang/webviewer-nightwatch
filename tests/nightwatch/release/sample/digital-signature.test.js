describe('Digital Signature', function() {
  it('digitally sign a PDF and also certify a PDF doc', function(client) {
    client
      .loadSample('full-apis/DigitalSignatureTest')
      .waitForBuffer(2, function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .waitForElementNotVisible('[data-element="progressModal"]')
          .assert.screenshot('.pageContainer', 'digital-signature-sign.test.png');
      });    
  });
});