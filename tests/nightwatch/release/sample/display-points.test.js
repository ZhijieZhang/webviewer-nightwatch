describe('Display Points', function() {
  it('display points if a bounding box is detected', function(client) {
    client
      .loadSample('full-apis/ViewerDisplayPointsTest')
      .waitForWVEvent('pageComplete')
      .readerControl('setToolMode', 'AnnotationCreateLine')
      .moveToElement('.pageContainer', 500, 330)
      .mouseButtonClick('left')
      .waitForWVEvent('annotManager', 'annotationChanged')
      // wait 500ms for rectangles to be drawn
      .pause(500)
      .assert.screenshot('.pageContainer', 'display-points.test.png');
  });
});