const getFileType = require('../../utils/getFileType');

module.exports = function(fileName) {
  const fileType = getFileType(fileName);

  describe('Form', function() {
    it(`can change the values of each type of form field in the document and the values are the same after reloading the ${fileType}`, function(client) {
      const form = client.page.form();
  
      client.executeOnce({
        readerControl: ['loadDocument', `/samples/files/${fileName}`],
        waitForWVEvent: 'annotationsLoaded'
      }, function() {
        if (fileType === 'XOD') {
          // form.xod is by default 100% and the document container's size
          // is exceeding the viewport which will affect the screenshot test so we manually setFitMode to FitPage
          // note that if we are using another XOD file we probably don't need this 
          client.executeOnce({
            readerControl: ['setFitMode', 'FitPage'],
            waitForWVEvent: 'pageComplete'
          });
        }
      });  

      form
        .clearFormElement('@textField')
        .setValue('@textField', 'This is a text field')
        .clearFormElement('@passwordField')
        .setValue('@passwordField', 'password')
        .clearFormElement('@quantityTextField')
        .setValue('@quantityTextField', '5')
        .clearFormElement('@currencyTextField')
        .setValue('@currencyTextField', '1221')
        .clearFormElement('@dateTextField')
        .setValue('@dateTextField', '1.1.2019')
        .clearFormElement('@percentTextField')
        .setValue('@percentTextField', '0.99')
        .clearFormElement('@multilineTextField')
        .setValue('@multilineTextField', 'This is a multiple line text field')
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
        .assert.screenshot('.pageContainer', `form.${fileType}.png`)
        .saveAndReload(`/samples/files/${fileName}`)
        .assert.screenshot('.pageContainer', `form.${fileType}.png`);
    });
  });
};
