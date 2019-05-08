describe('Element Edit', function() {
  it('edit the page display list and modify graphics state attributes on existing elements', function(client) {
    client
      .loadSample('full-apis/ElementEditTest')
      .waitForBuffer(1, 100000, function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'element-edit.test.png');
      });    
  });
});