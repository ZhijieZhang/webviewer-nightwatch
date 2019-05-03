describe('Encryption', function() {
  it.only('encrypt and decrypt fils by adding or removing passwords', function(client) {
    client
      .loadSample('full-apis/EncTest')
      .getPDFBufferAfter('done', function([
        encryptedPDFBuffer,
        decryptedPDFBuffer
      ]) {

        client
          .loadSample('viewing/viewing', {
            buffer: encryptedPDFBuffer
          })
          .waitForElementVisible('[data-element="passwordModal"]', 5000)
          .setValue('input[type=password]', 'test')
          .click('[data-element="passwordSubmitButton"]')
          .waitForWVEvent('pageComplete');
        
        client
          .loadSample('viewing/viewing', {
            buffer: decryptedPDFBuffer
          })
          .waitForWVEvent('pageComplete');
      });    
  });
});