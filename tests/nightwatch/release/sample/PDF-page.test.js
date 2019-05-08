const assert = require('assert');

describe('PDF Page', function() {
  it.only('copy pages from one document to another, delete pages, re-arrange pages, use ImportPages() for efficient copy and merge operations', function(client) {
    client
      .loadSample('full-apis/PDFPageTest')
      .waitForBuffer(8, [
        function(page1PDFBuffer, next) {
          client
            .loadSample('viewing/viewing', {
              buffer: page1PDFBuffer
            })
            .waitForWVEvent('pageComplete')
            .assert.screenshot('.pageContainer', 'PDF-page-1.test.png')
            .perform(function(done) {
              next();
              done();
            });
        },
        function(page2PDFBuffer, next) {
          client
            .loadSample('viewing/viewing', {
              buffer: page2PDFBuffer
            })
            .waitForWVEvent('pageComplete')
            .assert.screenshot('.pageContainer', 'PDF-page-1.test.png')
            .perform(function(done) {
              next();
              done();
            });
        },
      ]);



      // .waitForBuffer(8, function([
      //   page1PDFBuffer,
      //   page2PDFBuffer,
      //   page3PDFBuffer,
      //   page4PDFBuffer,
      //   mergedPDFBuffer,
      //   removedPDFBuffer,
      //   insertedPDFBuffer,
      //   clonedPDFBuffer
      // ]) {
      //   [
      //     page1PDFBuffer,
      //     page2PDFBuffer,
      //     page3PDFBuffer,
      //     page4PDFBuffer
      //   ].forEach(function(buffer, index) {
      //     client
      //       .loadSample('viewing/viewing', {
      //         buffer
      //       })
      //       .waitForWVEvent('pageComplete')
      //       .assert.screenshot('.pageContainer', `PDF-page-${index + 1}.test.png`);
      //   });


      //   client
      //     .loadSample('viewing/viewing', {
      //       buffer: mergedPDFBuffer
      //     })
      //     .readerControl('setLayoutMode', 'Single');
      //   Array
      //     .from({ length: 4 }, (_, index) => index + 1)
      //     .forEach(function(pageNumber) {
      //       client
      //         .readerControl('setCurrentPageNumber', pageNumber)
      //         .waitForWVEvent('pageComplete')
      //         .assert.screenshot('.pageContainer', `PDF-page-${pageNumber}.test.png`);
      //     });

      //   client
      //     .loadSample('viewing/viewing', {
      //       buffer: removedPDFBuffer
      //     })
      //     .waitForWVEvent('pageComplete')
      //     .readerControl('getPageCount', function(pageCount) {
      //       assert.equal(pageCount, 7);
      //     });

      //   client
      //     .loadSample('viewing/viewing', {
      //       buffer: insertedPDFBuffer
      //     })
      //     .waitForWVEvent('pageComplete')
      //     .readerControl('setCurrentPageNumber', 9)
      //     .readerControl('setFitMode', 'FitPage')
      //     .waitForWVEvent('pageComplete')
      //     .assert.screenshot('#pageContainer8', 'PDF-page-insert.test.png');

      //   client
      //     .loadSample('viewing/viewing', {
      //       buffer: clonedPDFBuffer
      //     })
      //     .waitForWVEvent('pageComplete')
      //     .readerControl('setCurrentPageNumber', 8)
      //     .waitForWVEvent('pageComplete')
      //     .assert.screenshot('#pageContainer7', 'PDF-page-clone.test.png');
      // });    
  });
});