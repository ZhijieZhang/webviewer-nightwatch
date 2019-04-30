describe('Legacy Viewer', function() {
  it('load the document in the legacy viewer', function(client) {
    client
      .loadSample('viewing/viewing-with-legacy-ui')
      .waitForWVEvent('pageComplete');
  });
});