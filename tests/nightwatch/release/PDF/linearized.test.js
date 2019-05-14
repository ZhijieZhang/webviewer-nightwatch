const scrollAndZoomFrantically = require('../../utils/scrollAndZoomFrantically');

describe('Linearized PDF', function() {
  it('load linearized.pdf and frantically scroll and zoom', function(client) {
    client
      .readerControl('loadDocument', '/samples/files/linearized.pdf', {
        waitForWVEvent: 'pageComplete',
        callback: function() {
          scrollAndZoomFrantically(client);  
        } 
      });
  });

  it('load linearized.pdf with useDownloaderOption to false, and frantically scroll and zoom', function(client) {
    client
      .setUrlWithOptions({ useDownloader: false })
      .readerControl('loadDocument', '/samples/files/linearized.pdf')
      .waitForWVEvent('pageComplete', {
        waitForWVEvent: 'pageComplete',
        callback: function() {
          scrollAndZoomFrantically(client);  
        } 
      });
  });
});