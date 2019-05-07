const assert = require('assert');

describe('Preprocess', function() {
  it.only('flattens all the annotations and log the number of annotations modified', function(client) {
    client
      .loadSample('full-apis/ViewerPreprocessTest')
      .waitForWVEvent('pageComplete')
      .readerControl('annotManager', 'getAnnotationsList', function(annotations) {
        assert.equal(annotations.length, 0);
      })
      .waitForConsoleLog('number of annotation modifications: 2');
  });
});