const scrollAndZoomFrantically = function(client) {
  client.readerControl('getPageCount', function (totalPages) {
    // an array that contains the odd page numbers for the loaded document
    // only picking odd page numbers so that a bigger scroll change can be achieved after we set to a different page number 
    const pagesToScroll = Array.from({ length: totalPages }, (_, index) => index + 1).filter(pageNumber => pageNumber % 2 !== 0);
    const levelsToZoom = Array.from({ length: 5 }, (_, index) => (index + 1) * 2);

    // try zooming into different values and then navigating to a different page
    pagesToScroll.forEach((pageNumber) => {
      client
        .readerControl('setCurrentPageNumber', pageNumber)
        // WebViewer will pre-render the next page so changing the page number doesn't necessarily trigger pageComplete event 
        // change the zoom level to make sure that pageComplete event will be triggered
        .executeOnce({
          readerControl: ['setZoomLevel', 30],
          waitForWVEvent: 'pageComplete'
        });

      levelsToZoom.forEach((zoomLevel) => {
        client
          .readerControl('setZoomLevel', zoomLevel)
          .pause(150);
      });
    });
  });
};

module.exports = scrollAndZoomFrantically;