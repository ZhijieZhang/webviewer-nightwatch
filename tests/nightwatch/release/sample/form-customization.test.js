describe('Form Customization', function() {
  it.only('customize form fields', function(client) {
    client
      .loadSample('customization/form-fields')
      .waitForWVEvent('pageComplete')
      .frameParent()
      .click('#custom')
      .assert.screenshot('.pageContainer', 'form-customization.png');
  });
});