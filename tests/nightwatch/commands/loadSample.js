exports.command = function(samplePath, options, callback = () => {}) {
  // samples that doesn't use an iframe to load the viewer
  // currently this includes the flipbook sample and all console-based samples
  // if any of the path url for these samples changed, this array needs to be updated
  // TODO: find out if this array can be automatically updated by checking full-apis.md
  const nonViewerSamples = [
    'advanced/flipbook/',
    'full-apis/AddImageTest/',
    'full-apis/AnnotationTest/',
    'full-apis/BookmarkTest/',
    'full-apis/ContentReplacerTest/',
    'full-apis/DigitalSignatureTest/',
    'full-apis/ElementBuilderTest/',
    'full-apis/ElementEditTest/',
    'full-apis/ElementReaderTest/',
    'full-apis/EncTest/',
    'full-apis/FDFTest/',
    'full-apis/InteractiveFormsTest/',
    'full-apis/LogicalStructureTest/',
    'full-apis/OfficeToPDFTest/',
    'full-apis/PDFATest/',
    'full-apis/PDFDrawTest/',
    'full-apis/PDFLayersTest/',
    'full-apis/PDFPageTest/',
    'full-apis/PDFRedactTest/',
    'full-apis/RectTest/',
    'full-apis/SDFTest/',
    'full-apis/StamperTest/',
    'full-apis/TextExtractTest/',
    'full-apis/TextSearchTest/'
  ];

  let isViewerSample = true;
  for (let nonViewerPath of nonViewerSamples) {
    if (nonViewerPath.includes(samplePath)) {
      isViewerSample = false;
      break;
    }
  }

  this
    .resizeWindow(1280, 960)
    .url(`http://localhost:3000/samples/${samplePath}`, function() {
      if (isViewerSample) {
        this
          .waitForElementVisible('iframe', 1000)
          .switchToUIFrame(function() {
            if (options.buffer) {
              this
                .setUrlWithOptions({
                  pdftronServer: '' 
                })
                .waitForWVEvent('pageComplete')
                .execute(
                  function(buffer) {
                    const blob = new Blob([new Uint8Array(buffer)], { type: 'application/pdf' });
      
                    window.readerControl.loadDocument(blob);
                  },

                  [options.buffer],

                  function() {
                    callback.call(this);
                  }
                );
            } else {
              callback.call(this);
            }
          });
      } else {
        callback.call(this);
      }
    });
};