describe('Edit', function() {
  it('load sample.pdf and edit', function(client) {
    client
      .loadSample('full-apis/ViewerEditTest')
      .waitForWVEvent('pageComplete')
      .readerControl('loadDocument', '/samples/files/sample.pdf')
      .waitForWVEvent('pageComplete')
      .waitForElementNotVisible('[data-element="progressModal"]')
      .elements('css selector', '.StatefulButton', function({ value: buttons }) {
        const lastBtn = buttons[buttons.length - 1];

        client.elementIdClick(Object.values(lastBtn)[0]);
      })
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.pageContainer', 'edit.test.png');
  });
});