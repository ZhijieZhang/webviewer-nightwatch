describe('Diff Documents', function() {
  it('render three synced panels where the middle one shows pixel differences between the two documents', function(client) {
    client
      .loadSample('advanced/diff', {
        iframe: 1
      })
      .waitForWVEvent('pageComplete')
      .assert.screenshot('.pageContainer', 'diff-documents.test.png');
  });
});