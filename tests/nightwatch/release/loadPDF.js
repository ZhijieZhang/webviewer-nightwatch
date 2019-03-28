const scrollAndZoomFrantically = require('../utils/scrollAndZoomFrantically');

describe('Load PDF', function() {
  describe('Client only', function() {
    beforeEach(function(client, done) {
      client
        .url('http://localhost:3000/samples/viewing/viewing/')
        .waitForElementVisible('iframe', 1000)
        .switchToUIFrame()
        .setUrlWithOptions({ pdftronServer: '' })
        .waitForWVEvent('pageComplete', done);
    });

    describe('Normal PDF', function() {
      it('load sample.pdf using constructor options', function(client) {
        client
          .setUrlWithOptions({ initialDoc: '/samples/files/sample.pdf' })
          .waitForWVEvent('pageComplete')
      });

      it('load sample.pdf using loadDocument API', function(client) {
        client
          .readerControl('loadDocument', '/samples/files/sample.pdf')
          .waitForWVEvent('pageComplete');
      });

      it('load sample.pdf, sample-annotated.pdf back and forth using loadDocument API', function(client) {
        client
          .readerControl('loadDocument', '/samples/files/sample.pdf')
          .waitForWVEvent('pageComplete')
          .readerControl('loadDocument', '/samples/files/sample-annotated.pdf')
          .waitForWVEvent('pageComplete')
          .readerControl('loadDocument', '/samples/files/sample.pdf')
          .waitForWVEvent('pageComplete')
          .readerControl('loadDocument', '/samples/files/sample-annotated.pdf')
          .waitForWVEvent('pageComplete');
      });
    });

    describe('Linearized PDF', function() {
      it('load linearized.pdf and frantically scroll and zoom', function(client) {
        client
          .readerControl('loadDocument', '/samples/files/linearized.pdf')
          .waitForWVEvent('pageComplete', function() {
            scrollAndZoomFrantically(client)
          })
      });

      it('load linearized.pdf with useDownloaderOption to false, and frantically scroll and zoom', function(client) {
        client
        .setUrlWithOptions({ useDownloader: false })
        .readerControl('loadDocument', '/samples/files/linearized.pdf')
        .waitForWVEvent('pageComplete', function() {
          scrollAndZoomFrantically(client)
        })
      })
    });

    describe('Non-linearized PDF', function() {
      it('load non-linearized.pdf', function(client) {
        client
          .readerControl('loadDocument', '/samples/files/non-linearized.pdf')
          .waitForWVEvent('pageComplete');
      });
    })
  });

  describe('With Server', function() {
    beforeEach(function(client, done) {
      client
        .url('http://localhost:3000/samples/viewing/viewing/')
        .waitForElementVisible('iframe', 1000)
        .switchToUIFrame(done);
    });

    it('load webviewer-demo-annotated.pdf using constructor options', function(client) {
      client.waitForWVEvent('pageComplete');
    });

    it('load sales-invoice.pdf using loadDocument API', function(client) {
      client
        .waitForWVEvent('pageComplete')
        .readerControl('loadDocument', 'https://pdftron-showcase-documents.s3.amazonaws.com/sales-invoice.pdf')
        .waitForWVEvent('pageComplete');
    });
  });
})