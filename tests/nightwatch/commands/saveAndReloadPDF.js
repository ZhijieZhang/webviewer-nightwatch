exports.command = function() {
  this.executeAsync(
    function(done) {
      window = window || window[0];
      const docViewer = window.readerControl.docViewer;
      const annotManager = docViewer.getAnnotationManager();
      const doc = docViewer.getDocument();

      const completingFreeHand = docViewer.getTool('AnnotationCreateFreeHand').complete();
      const loadingAnnotations = docViewer.getAnnotationsLoadedPromise();

      Promise.all([completingFreeHand, loadingAnnotations]).then(function() {
        doc.getFileData({
          downloadType: 'pdf',
          xfdfString: annotManager.exportAnnotations()
        }).then(function(data) {
          const blob = new Blob([new Uint8Array(data)], { type: 'application/pdf' })
          window.readerControl.loadDocument(blob);
          
          done();
        });
      })
    }
  )

  return this;
}