describe('Content Replacer', function() {
  it('replace of objects such as images, text and strings within a document', function(client) {
    client
      .loadSample('full-apis/ContentReplacerTest')
      .getPDFBufferAfter([
        'Done. Result saved as BusinessCard.pdf',
        'Done. Result saved as newsletterReplaced.pdf'
      ], function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'content-replacer-business-card.test.png')
          .loadSample('viewing/viewing', {
            buffer: buffers[1]
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'content-replacer-news-letter.test.png');
      });    
  });
});