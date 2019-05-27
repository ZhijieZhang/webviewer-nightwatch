describe('Encryption', function() {
  it('encrypt and decrypt fils by adding or removing passwords', function(client) {
    client
      .loadSample('full-apis/EncTest')
      .waitForBuffer(2, function([
        encryptedPDFBuffer,
        decryptedPDFBuffer
      ]) {
        client
          .loadSample('viewing/viewing', {
            buffer: encryptedPDFBuffer
          })
          .waitForElementVisible('[data-element="passwordModal"]', 10000)
          .setValue('input[type=password]', 'test')
          .click('[data-element="passwordSubmitButton"]')
          .waitForElementNotVisible('[data-element="passwordModal"]');
        
        client
          .loadSample('viewing/viewing', {
            buffer: decryptedPDFBuffer
          })
          .waitForWVEvent('pageComplete');
      });    
  });
});