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

    describe('Encrypted PDF', function() {
      let passwordModal;

      beforeEach(function(client, done) {
        client.readerControl('loadDocument', '/samples/files/encrypted-foobar12.pdf');
        
        passwordModal = client.page.passwordModal();
        passwordModal.waitForElementVisible('@modal', 5000, () => done());
      })

      it('show password modal', function() {})

      it('load successfully after the correct password is submitted', function(client) {
        passwordModal
          .setValue('@input', 'foobar12')
          .click('@submitBtn');
        client
          .waitForWVEvent('pageComplete');
      })

      it('show wrong password information after a wrong password is submitted', function() {
        passwordModal
          .setValue('@input', 'this cannot be the correct password ^_^')
          .click('@submitBtn')
          .assert.cssClassPresent('@input', 'wrong')
          .waitForElementVisible('@wrongPasswordDiv', 5000);
      })

      it('remain visible after cancel button is clicked', function() {
        passwordModal
          .click('@cancelBtn')
          .expect.element('@modal').to.be.present;
      })
    })

    describe('PDF with JavaScript', function() {
      let jsPDF;

      beforeEach(function(client, done) {
        jsPDF = client.page.jsPDF();
       
        client
          .readerControl('loadDocument', '/samples/files/javascript.pdf')
          .waitForWVEvent('annotationsLoaded', done)
      })

      it.only('update divs???', function(client) {
        jsPDF
          .moveToElement('@textInput', 5, 5)
          .expect.element('@enterExitInput').to.have.value.that.equals('Mouse Enter - Text')
        
        client.pause(500000);
      })
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