const getFileType = require('../utils/getFileType');

exports.command = function(filePath = '', callback = () => {}) {
  const fileType = getFileType(filePath);

  this.executeAsync(
    function(filePath, fileType, done) {
      window = window || window[0];
      const docViewer = window.readerControl.docViewer;
      const annotManager = docViewer.getAnnotationManager();
      const xfdfString = annotManager.exportAnnotations();

      if (fileType === 'XOD') {
        window.readerControl.loadDocument(filePath);
        docViewer.one('pageComplete', function() {
          annotManager.importAnnotations(xfdfString);
          done();
        });
      } else {
        const doc = docViewer.getDocument();
        const completingFreeHand = docViewer.getTool('AnnotationCreateFreeHand').complete();
        const loadingAnnotations = docViewer.getAnnotationsLoadedPromise();
  
        Promise.all([completingFreeHand, loadingAnnotations]).then(function() {
          doc.getFileData({
            downloadType: 'pdf',
            xfdfString
          }).then(function(data) {
            const blob = new Blob([new Uint8Array(data)], { type: 'application/pdf' });
            window.readerControl.loadDocument(blob);
            
            done();
          });
        });
      }
    },

    [filePath, fileType],

    function() {
      if (fileType === 'XOD') {
        this
          // we waited for 500ms here for the annotations to be drawn instead of using waitForWVEvent command because 
          // a) pageComplete doesn't trigger in the case
          // b) annotationChanged is triggered synchronously in the importAnnotations call so we can't capture it
          .pause(500, function() {
            callback.call(this);
          });
      } else {
        this.waitForWVEvent('pageComplete', function() {
          callback.call(this);
        });
      }
    }
  );

  return this;
};