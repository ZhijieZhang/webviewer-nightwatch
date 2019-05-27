describe('Element Builder', function() {
  // TODO: fix this in LT
  it('use PDFNet page writing API, embed fonts and images and copy graphical elements from one page to another', function(client) {
    client
      .loadSample('full-apis/ElementBuilderTest')
      .waitForBuffer(1, function(buffers) {
        client
          .loadSample('viewing/viewing', {
            buffer: buffers[0]
          })
          .waitForWVEvent('pageComplete')
          // page 4 is wider than page 1 so it will overflow when we take the screenshot
          // in order to make sure that every page is in the viewport, we scroll to page 4 first and make it fit to page
          // before taking screenshots
          .readerControl('setLayoutMode', 'Single')
          .readerControl('setCurrentPageNumber', 4)
          .readerControl('setFitMode', 'FitPage')
          .waitForWVEvent('pageComplete');
          
        const pageCount = 8; 
        Array
          .from({ length: pageCount }, (_, index) => index + 1)  
          .forEach(function(pageNumber) {
            client
              .readerControl('setCurrentPageNumber', pageNumber)
              .waitForWVEvent('pageComplete')
              .assert.screenshot('.pageContainer', `element-builder-${pageNumber}.test.png`);
          });
      });    
  });
});