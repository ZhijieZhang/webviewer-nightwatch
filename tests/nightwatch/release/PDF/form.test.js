describe('Form', function() {
  it('can change the values of each type of form field in the document and the values are the same after reloading the PDF', function(client) {
    const form = client.page.form();

    client
      .readerControl('loadDocument', '/samples/files/form.pdf')     
      .waitForWVEvent('annotationsLoaded');
      
    form
      .clear('@textField')
      .setValue('@textField', 'This is a text field')
      .clear('@passwordField')
      .setValue('@passwordField', 'password')
      .clear('@quantityTextField')
      .setValue('@quantityTextField', '5')
      .clear('@currencyTextField')
      .setValue('@currencyTextField', '1221')
      .clear('@dateTextField')
      .setValue('@dateTextField', '1.1.2019')
      .clear('@percentTextField')
      .setValue('@percentTextField', '0.99')
      .setValue('@multilineTextField', 'This is a multiline text field')
      .click('@radioBox')
      .click('@checkbox')
      .click('@choiceFieldFirstOption')
      .click('@listFieldFirstOption');

    client
      // click('@listFieldFirstOption') will focus the first option
      // since the option won't be focused after we reload the pdf
      // we need to click somewhere else to unfocus it before comparing the screenshot
      .moveToElement('.pageContainer', 5, 5)
      .mouseButtonClick()
      .assert.screenshot('.pageContainer', 'form.test.png')
      .saveAndReloadPDF()
      .waitForWVEvent('annotationsLoaded')
      .assert.screenshot('.pageContainer', 'form.test.png');
  });
});