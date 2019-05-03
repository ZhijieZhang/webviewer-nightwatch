const assert = require('assert');

describe('Bookmark', function() {
  it('embed various raster image formats in a PDF document', function(client) {
    client
      .loadSample('full-apis/BookmarkTest')
      .getPDFBufferAfter(['Done.', 'Done.'], function(buffers) {
        const remoteBookmarkPDFBuffer = buffers[1];

        client
          .loadSample('viewing/viewing', {
            buffer: remoteBookmarkPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('openElement', 'outlinesPanel')
          // wait for the left panel to be fully opened
          .pause(500)
          .elements('css selector', '.Outline .arrow', function({ value: arrowIds }) {
            arrowIds.forEach(function({ ELEMENT: id }) {
              client.elementIdClick(id);
            });
          })
          .elements('css selector', '.Outline', function ({ value: outlineIds }) {
            const idPageNumberMap = {
              [outlineIds[2].ELEMENT]: 2,
              [outlineIds[4].ELEMENT]: 4,
              [outlineIds[7].ELEMENT]: 10,
              [outlineIds[8].ELEMENT]: 19,
            };

            Object.keys(idPageNumberMap).forEach(function(id) {
              client
                .elementIdClick(id)
                .readerControl('getCurrentPageNumber', function(pageNumber) {
                  assert.equal(pageNumber, idPageNumberMap[id]);
                });
            });
          })
          .pause(10000000);
      });
  });
});