describe('Redaction', function() {
  it('redact and permanently remove text, images or graphics from a document', function(client) {
    client
      .loadSample('advanced/redaction')
      .waitForWVEvent('pageComplete')
      .moveToElement('.pageContainer', 100, 100)
      .mouseButtonDown('left')
      // still didn't figure out why redaction annotations can't be made without waiting for 500ms here
      // probably because the creation is too fast?
      .pause(500)
      .moveToElement('.pageContainer', 400, 400)
      .mouseButtonUp('left')
      .click('[data-element="redactionButton"]')
      .waitForElementVisible('[data-element="redactionOverlay"]')
      .click('[data-element="applyAllButton"]')
      .waitForElementVisible('.WarningModal')
      .click('[data-element="WarningModalSignButton"]')
      .waitForWVEvent('annotManager', 'annotationChanged')
      .assert.screenshot('.App', 'redaction.test.png');
  });
});