describe('SDF Test', function() {
  it('extract an SDF document from a PDF document and change some of its values', function(client) {
    client
      .loadSample('full-apis/SDFTest')
      .waitForBuffer(1, function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'SDF.test.png');
      });
  });
});