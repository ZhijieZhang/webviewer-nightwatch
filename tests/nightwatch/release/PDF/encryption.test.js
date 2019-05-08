describe('Encrypted PDF', function() {
  let passwordModal;

  beforeEach(function(client, done) {
    client.readerControl('loadDocument', '/samples/files/encrypted-foobar12.pdf');
    
    passwordModal = client.page.passwordModal();
    passwordModal.waitForElementVisible('@modal', () => done());
  });

  it.skip('show password modal', function() {});

  it('load successfully after the correct password is submitted', function(client) {
    passwordModal
      .setValue('@input', 'foobar12')
      .click('@submitBtn');
    client
      .waitForWVEvent('pageComplete');
  });

  it('show wrong password information after a wrong password is submitted', function() {
    passwordModal
      .setValue('@input', 'this cannot be the correct password ^_^')
      .click('@submitBtn')
      .assert.cssClassPresent('@input', 'wrong')
      .waitForElementVisible('@wrongPasswordDiv');
  });

  it('remain visible after cancel button is clicked', function() {
    passwordModal
      .click('@cancelBtn')
      .expect.element('@modal').to.be.present;
  });
});