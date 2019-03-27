module.exports = {
  'Demo test Google' : function (client) {
    // client
    //   .url('http://www.google.com')
    //   .waitForElementVisible('body', 1000)
    //   .assert.title('Google')
    //   .assert.visible('input[type=text]')
    //   .setValue('input[type=text]', 'rembrandt van rijn')
    //   .waitForElementVisible('button[name=btnG]', 1000)
    //   .click('button[name=btnG]')
    //   .pause(1000)
    //   .assert.containsText('ol#rso li:first-child',
    //     'Rembrandt - Wikipedia')
    //   .end();
    client
      // .url('http://192.168.1.72:3000/samples/viewing/viewing')
      .url('http://localhost:3000/samples/viewing/viewing')
      .waitForElementVisible('body', 1000)
      .pause(30000)
      .end();
  }
};