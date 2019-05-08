describe('Snap To Nearest', function() {
  it('use the snap API for calculating the nearest snap point', function(client) {
    client
      .loadSample('full-apis/ViewerSnapToNearestTest')
      .waitForWVEvent('pageComplete')
      .moveToElement('.pageContainer', 350, 150)
      // wait for the line to be drawn
      .pause(500)
      .assert.screenshot('.pageContainer', 'snap-to-nearest.test.png');
  });
});