const assert = require('assert');

describe('Interactive Forms', function() {
  it('create and edit interactive forms (check boxes and text boxes)', function(client) {
    const firstNameId = '#employee\\.name\\.first input[type="text"]';
    const lastNameId = '#employee\\.name\\.last input[type="text"]';
    const checkboxId = '#employee\\.name\\.check1 input[type="checkbox"]';
    const submitId = '#submit';

    client
      .loadSample('full-apis/InteractiveFormsTest')
      .waitForBuffer(4, function([
        formPDFBuffer,
        editedFormPDFBuffer,
        clonedFormPDFBuffer,
        flattenedFormPDFBuffer
      ]) {
        client
          .loadSample('viewing/viewing', {
            buffer: formPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .waitForElementPresent(firstNameId)
          .assert.value(firstNameId, 'John')
          .waitForElementPresent(lastNameId)
          .assert.value(lastNameId, 'Doe')
          .waitForElementPresent(`${checkboxId}:checked`)
          .waitForElementPresent(submitId);

        client
          .loadSample('viewing/viewing', {
            buffer: editedFormPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .waitForElementPresent(firstNameId)
          .assert.value(firstNameId, 'This is a new value. The old one was: John')
          .waitForElementPresent(lastNameId)
          .assert.value(lastNameId, 'This is a new value. The old one was: Doe')
          .waitForElementPresent(`${checkboxId}:checked`)
          .waitForElementPresent(submitId);

        
        client
          .loadSample('viewing/viewing', {
            buffer: clonedFormPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('getPageCount', function(pageCount) {
            assert.equal(pageCount, 5);
          })
          .waitForElementPresent(firstNameId.replace(/first/, 'first0'))
          .waitForElementPresent(lastNameId.replace(/last/, 'last0'))
          .waitForElementPresent(`${checkboxId.replace(/check1/, 'check10')}:checked`)
          .waitForElementPresent(submitId.replace(/submit/, 'submit0'))
          .readerControl('setCurrentPageNumber', 5)
          // wait for the widgets to be rendered
          .pause(500)
          .waitForElementPresent(firstNameId.replace(/first/, 'first4'))
          .waitForElementPresent(lastNameId.replace(/last/, 'last4'))
          .waitForElementPresent(`${checkboxId.replace(/check1/, 'check14')}:checked`)
          .waitForElementPresent(submitId.replace(/submit/, 'submit4'));

        client
          .loadSample('viewing/viewing', {
            buffer: flattenedFormPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('annotManager', 'getAnnotationsList', function(annotations) {
            assert.equal(annotations.length, 0);
          })
          .waitForElementNotPresent(firstNameId)
          .waitForElementNotPresent(lastNameId)
          .waitForElementNotPresent(`${checkboxId}:checked`)
          .waitForElementNotPresent(submitId);
      });    
  });
});