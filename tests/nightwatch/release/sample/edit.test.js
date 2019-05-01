describe('Edit', function() {
  it.only('load sample.pdf, edit and then compare the screenshots', function(client) {
    client
      .loadSample('full-apis/ViewerEditTest')
      .waitForWVEvent('pageComplete')
      .readerControl('loadDocument', '/samples/files/sample.pdf')
      .waitForWVEvent('pageComplete')
      // sometimes the progress modal is still open after the pageComplete event is triggered
      // wait for it to be closed
      .pause(500)
      .elements('css selector', '.StatefulButton', function({ value: btnIds }) {
        const lastBtnId = btnIds[btnIds.length - 1];

        client.elementIdClick(lastBtnId.ELEMENT);
      })
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.pageContainer', 'edit.test.png');
  });
});