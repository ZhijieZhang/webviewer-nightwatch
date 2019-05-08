const assert = require('assert');

describe('Bookmark', function() {
  it('read and edit existing outline items and create new bookmarks using the high-level API', function(client) {
    client
      .loadSample('full-apis/BookmarkTest')
      .waitForBuffer(2, function(buffers) {
        const remoteBookmarkPDFBuffer = buffers[1];

        client
          .loadSample('viewing/viewing', {
            buffer: remoteBookmarkPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('openElement', 'outlinesPanel')
          // wait for the left panel to be fully opened
          .pause(500)
          .elements('css selector', '.Outline .arrow', function({ value: arrows }) {
            arrows.forEach(function(arrow) {
              const id = Object.values(arrow)[0];
              client.elementIdClick(id);
            });
          })
          .elements('css selector', '.Outline', function ({ value: outlines }) {
            const idPageNumberMap = {
              [Object.values(outlines[2])[0]]: 2,
              [Object.values(outlines[4])[0]]: 4,
              [Object.values(outlines[7])[0]]: 10,
              [Object.values(outlines[8])[0]]: 19,
            };

            Object.keys(idPageNumberMap).forEach(function(id) {
              client
                .elementIdClick(id)
                .readerControl('getCurrentPageNumber', function(pageNumber) {
                  assert.equal(pageNumber, idPageNumberMap[id]);
                });
            });
          });
      });
  });
});