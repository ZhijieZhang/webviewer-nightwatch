exports.command = function(samplePath, ...args) {
  let options = {}, 
      callback = () => {};
  if (args.length === 1) {
    typeof args[0] === 'function' 
      ? callback = args[0]
      : options = args[0];
  } else if (args.length === 2) {
    options = args[0];
    callback = args[1];
  }

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
    // .url(`http://localhost:3000/samples/${samplePath}`, function() {
    .url(`http://localhost.lambdatest.com:3000/samples/${samplePath}`, function() {
      if (isViewerSample) {
        this
          .waitForElementVisible('iframe')
          .switchToUIFrame(options.iframe, function() {
            if (options.buffer) {
              loadDocumentWithBuffer.call(this, options.buffer, callback);
            } else {
              callback.call(this);
            }
          });
      } else {
        callback.call(this);
      }
    });
};

function loadDocumentWithBuffer(buffer, callback) {
  this
    .setUrlWithOptions({
      pdftronServer: ''
    })
    .execute(
      function (buffer) {
        let mimeType;
        if (Array.isArray(buffer)) {
          mimeType = 'application/pdf';
        } else if (typeof buffer === 'object') {
          mimeType = buffer.mimeType;
          buffer = buffer.buffer;

          if (!Array.isArray(buffer) && typeof buffer === 'object') {
            // geckodriver will serialize the uint8Array to an object when we return it from the execute command so we convert it back to an array here
            buffer = Object.keys(buffer).reduce((bufferArray, key) => {
              bufferArray.push(buffer[key]);
              return bufferArray;
            }, []);
          }
        }

        const blob = new Blob([new Uint8Array(buffer)], { type: mimeType });
        window.readerControl.loadDocument(blob);
      },

      [buffer],

      function () {
        callback.call(this);
      }
    );
}