describe('Flipbook', function() {
  it.only('navigate to different pages and compare the screenshot', function(client) {
    client
      .resizeWindow(1280, 960)
      .url('http://localhost:3000/samples/advanced/flipbook')
      .waitForElementVisible('#flipbook')
      .waitForElementVisible('.page.p3.odd', 10000)
      .click('#next')
      // wait for 1.5secs for the flipping animation to complete
      .pause(1500)
      .assert.screenshot({
        selector: '#flipbook'
      }, 'flipbook.png');
  });
});