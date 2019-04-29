// Skipping this test because keys API seems to be broken at this moment, which prevent 
// us from using ctrl/command + v to paste and check the string value

describe.skip('Text Selection', function() {
  beforeEach(function(client, done) {
    client
      .execute(function() {
        window = window || window[0];
        window.Tools.Tool.ENABLE_AUTO_SWITCH = false;
      })
      .readerControl('setToolMode', 'TextSelect', done);
  })

  it('select and copy the text in the same page', function(client) {
    client
      .moveToElement('#pageContainer0', 100, 630)
      .mouseButtonDown('left')
      .moveToElement('#pageContainer0', 300, 680)
      .mouseButtonUp('left')
      .waitForElementVisible('[data-element="textPopup"]', 5000)
      .click('[data-element="copyTextButton"]')
      .click('[data-element="leftPanelButton"]')
      .pause(500)
      .click('.NotesPanel .header input[type="text"]')
      .keys([client.Keys.COMMAND, 'V', client.Keys.NULL])
  })

  it('select and copy the text in multiple pages', function(client) {

  })
})