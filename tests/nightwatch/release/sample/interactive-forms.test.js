const assert = require('assert');

describe('Interactive Forms', function() {
  it('create and edit interactive forms (check boxes and text boxes)', function(client) {
    const firstNameId = '#employee\\.name\\.first input[type="text"]';
    const lastNameId = '#employee\\.name\\.last input[type="text"]';
    const checkboxId = '#employee\\.name\\.check1 input[type="checkbox"]';
    const submitId = '#submit';

    client
      .loadSample('full-apis/InteractiveFormsTest')
      .getPDFBufferAfter([
        'Example 1 complete and everything deallocated.',
        'Example 2 complete and everything deallocated.',
        'Example 3 complete and everything deallocated.',
        'Example 4 complete and everything deallocated.'
      ], function([
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
          .waitForElementPresent(firstNameId, 5000)
          .assert.value(firstNameId, 'John')
          .waitForElementPresent(lastNameId, 5000)
          .assert.value(lastNameId, 'Doe')
          .waitForElementPresent(`${checkboxId}:checked`, 5000)
          .waitForElementPresent(submitId, 5000);

        client
          .loadSample('viewing/viewing', {
            buffer: editedFormPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .waitForElementPresent(firstNameId, 5000)
          .assert.value(firstNameId, 'This is a new value. The old one was: John')
          .waitForElementPresent(lastNameId, 5000)
          .assert.value(lastNameId, 'This is a new value. The old one was: Doe')
          .waitForElementPresent(`${checkboxId}:checked`, 5000)
          .waitForElementPresent(submitId, 5000);

        
        client
          .loadSample('viewing/viewing', {
            buffer: clonedFormPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('getPageCount', function(pageCount) {
            assert.equal(pageCount, 5);
          })
          .waitForElementPresent(firstNameId.replace(/first/, 'first0'), 5000)
          .waitForElementPresent(lastNameId.replace(/last/, 'last0'), 5000)
          .waitForElementPresent(`${checkboxId.replace(/check1/, 'check10')}:checked`, 5000)
          .waitForElementPresent(submitId.replace(/submit/, 'submit0'), 5000)
          .readerControl('setCurrentPageNumber', 5)
          .waitForWVEvent('pageComplete')
          .waitForElementPresent(firstNameId.replace(/first/, 'first4'), 5000)
          .waitForElementPresent(lastNameId.replace(/last/, 'last4'), 5000)
          .waitForElementPresent(`${checkboxId.replace(/check1/, 'check14')}:checked`, 5000)
          .waitForElementPresent(submitId.replace(/submit/, 'submit4'), 5000);

        client
          .loadSample('viewing/viewing', {
            buffer: flattenedFormPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('annotManager', 'getAnnotationsList', function(annotations) {
            assert.equal(annotations.length, 0);
          })
          .waitForElementNotPresent(firstNameId, 5000)
          .waitForElementNotPresent(lastNameId, 5000)
          .waitForElementNotPresent(`${checkboxId}:checked`, 5000)
          .waitForElementNotPresent(submitId, 5000);
      });    
  });
});