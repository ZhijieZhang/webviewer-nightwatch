exports.command = function(text, callback) {
  this.executeAsync(
    function(text, done) {
      window = window || window[0];
      const docViewer = window.readerControl.docViewer;
      const displayMode = docViewer.getDisplayModeManager().getDisplayMode()
      const doc = docViewer.getDocument();
      const pageIndex = 0;

      doc.loadPageText(pageIndex, function(allText) {
        const startInd = allText.indexOf(text);

        doc.getTextPosition(
          pageIndex, 
          startInd, 
          startInd + text.length, 
          function(quads) {
            const length = quads.length;
            const start = displayMode.pageToWindow({
              x: quads[0].x1,
              y: quads[0].y1
            }, pageIndex);
            const end = displayMode.pageToWindow({
              x: quads[length - 1].x4,
              y: quads[length - 1].y4
            }, pageIndex);

            done({ start, end });
          }
        );
      });
    },

    [text],

    result => { 
      if(typeof callback === 'function') {
        callback.call(this, result && result.value)
      }
    }
  )

  return this;
}