describe('Content Replacer', function() {
  it('replace of objects such as images, text and strings within a document', function(client) {
    client
      .loadSample('full-apis/ContentReplacerTest')
      .waitForBuffer(2, function(buffers) {
        client 
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          .waitForElementNotVisible('[data-element="progressModal"]')
          .assert.screenshot('.pageContainer', 'content-replacer-business-card.test.png')
          .loadSample('viewing/viewing', {
            buffer: buffers[1]
          })
          .waitForWVEvent('pageComplete')
          .waitForElementNotVisible('[data-element="progressModal"]')
          .assert.screenshot('.pageContainer', 'content-replacer-news-letter.test.png');
      });    
  });
});