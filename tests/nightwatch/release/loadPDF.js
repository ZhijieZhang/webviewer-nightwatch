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

    afterEach(function(client, done) {
      client.end(() => done());
    })

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
      let widgetElements, jsPDF;

      beforeEach(function(client, done) {
        jsPDF = client.page.jsPDF();
        widgetElements = [
          '@textWidget', 
          '@checkBtnWidget',
          '@choiceWidget',
          '@listWidget'
        ];

        client
          .readerControl('loadDocument', '/samples/files/javascript.pdf')
          .waitForWVEvent('annotationsLoaded', done)
      })

      it(`triggers mouseenter/mouseleave events when mouse entering/leaving a widget element`, function() {
        widgetElements.forEach(function(element) {
          jsPDF
            .moveToElement(element, 5, 5)
            .assert.valueContains('@enterExitInput', 'Mouse Enter', `${element} failed to trigger mouseenter event`)
        
          jsPDF
            .moveToElement('@documentContainer', 0, 0)
            .assert.valueContains('@enterExitInput', 'Mouse Exit', `${element} failed to trigger mouseleave event`)
        })
      });

      it('triggers mousedown/mouseup events when performing a mouse click event', function(client) {
        const isMac = process.platform === 'darwin';
        // choiceWidget essentially wraps a <select> and it is excluded when using Mac 
        // because after a mouse left down is performed, an overlay(select options) will be placed on top of the widget 
        // which triggers a mouseup event immediately and changes the input text in the @downUpInput  
        widgetElements = widgetElements.filter(element => isMac ? element !== '@choiceWidget' : true)
        widgetElements.forEach(function(element) {
          jsPDF
            .mouseDown('left', element)
            .assert.valueContains('@downUpInput', 'Mouse Down', `${element} failed to trigger mousedown event`);

          jsPDF
            .mouseUp('left')
            .assert.valueContains('@downUpInput', 'Mouse Up', `${element} failed to trigger mouseup event`);
        })
      })

      it('triggers focus/blur when clicking inside/outside a widget element', function() {
        const isMac = process.platform === 'darwin';
        // also excludes choiceWidget when using Mac here
        // because a outside click when the overlay is open will close it but still keeps the widget focused
        widgetElements = widgetElements.filter(element => isMac ? element !== '@choiceWidget' : true)
        widgetElements.forEach(function(element) {
          jsPDF
            .click(element)
            .assert.valueContains('@focusBlurInput', 'Focus', `${element} failed to trigger focus event`);

          jsPDF
            .click('@documentContainer')
            .assert.valueContains('@focusBlurInput', 'Blur', `${element} failed to trigger mouseup event`);
        })
      })
    })

    describe('PDF with substituted fonts', function() {
      it('load font-substituted.pdf', function(client) {
        client
          .readerControl('loadDocument', '/samples/files/font-substituted.pdf')
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