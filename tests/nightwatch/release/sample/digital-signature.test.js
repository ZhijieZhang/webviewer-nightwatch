describe('Digital Signature', function() {
  it('digitally sign a PDF and also certify a PDF doc', function(client) {
    client
      .loadSample('full-apis/DigitalSignatureTest')
      .getPDFBufferAfter([
        'Finished signing PDF document',
        'Finished certifying PDF document.'
      ], function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'digital-signature-sign.test.png');
      });    
  });
});