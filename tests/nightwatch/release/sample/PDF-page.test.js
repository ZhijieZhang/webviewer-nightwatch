const assert = require('assert');

describe('PDF Page', function() {
  it('copy pages from one document to another, delete pages, re-arrange pages, use ImportPages() for efficient copy and merge operations', function(client) {
    client
      .loadSample('full-apis/PDFPageTest')
      .waitForBuffer(8, function([
        page1PDFBuffer,
        page2PDFBuffer,
        page3PDFBuffer,
        page4PDFBuffer,
        mergedPDFBuffer,
        removedPDFBuffer,
        insertedPDFBuffer,
        clonedPDFBuffer
      ]) {
        // [
        //   page1PDFBuffer,
        //   page2PDFBuffer,
        //   page3PDFBuffer,
        //   page4PDFBuffer
        // ].forEach(function(buffer, index) {
        //   client
        //     .loadSample('viewing/viewing', {
        //       buffer
        //     })
        //     .waitForWVEvent('pageComplete')
        //     .waitForElementNotVisible('[data-element="progressModal"]')
        //     .assert.screenshot('.pageContainer', `PDF-page-${index + 1}.test.png`);
        // });


        client
          .loadSample('viewing/viewing', {
            buffer: mergedPDFBuffer
          })
          .readerControl('setLayoutMode', 'Single');
        Array
          .from({ length: 4 }, (_, index) => index + 1)
          .forEach(function(pageNumber) {
            client
              .executeOnce({
                readerControl: ['setCurrentPageNumber', pageNumber],
                waitForWVEvent: 'pageComplete'
              })
              .assert.screenshot('.pageContainer', `PDF-page-${pageNumber}.test.png`);
          });

        client
          .loadSample('viewing/viewing', {
            buffer: removedPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('getPageCount', function(pageCount) {
            assert.equal(pageCount, 7);
          });

        client
          .loadSample('viewing/viewing', {
            buffer: insertedPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('setCurrentPageNumber', 9)
          .executeOnce({
            readerControl: ['setFitMode', 'FitPage'],
            waitForWVEvent: 'pageComplete'
          })
          .assert.screenshot('#pageContainer8', 'PDF-page-insert.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: clonedPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .executeOnce({
            readerControl: ['setCurrentPageNumber', 8],
            waitForWVEvent: 'pageComplete'
          })
          .assert.screenshot('#pageContainer7', 'PDF-page-clone.test.png');
      });    
  });
});