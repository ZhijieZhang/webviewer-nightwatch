describe('SDF Test', function() {
  it.only('extract an SDF document from a PDF document and change some of its values', function(client) {
    client
      .loadSample('full-apis/SDFTest')
      .getPDFBufferAfter('Done.', function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'SDF.test.png');
      });
  });
});