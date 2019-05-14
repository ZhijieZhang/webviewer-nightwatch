const getFileType = require('../utils/getFileType');

exports.command = function(filePath = '', callback = () => {}) {
  const fileType = getFileType(filePath);

  this
    .executeAsync(
      function(filePath, fileType, done) {
        const docViewer = window.readerControl.docViewer;
        const annotManager = docViewer.getAnnotationManager();
        const xfdfString = annotManager.exportAnnotations();

        if (fileType === 'XOD') {
          docViewer.setInternalAnnotationsTransform(() => {});
          docViewer.setPagesUpdatedInternalAnnotationsTransform((originalData, pages, callback) => callback(''));
          window.readerControl.loadDocument(filePath);
          docViewer.one('pageComplete', function() {
            annotManager.one('annotationChanged', function() {
              done();
            });
            annotManager.importAnnotations(xfdfString);
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
              docViewer.one('pageComplete', function() {
                done();
              });
            });
          });
        }
      },

      [filePath, fileType],

      function() {
        callback.call(this);
      }
    );

  return this;
};