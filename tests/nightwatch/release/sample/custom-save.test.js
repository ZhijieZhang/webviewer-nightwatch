const assert = require('assert');

describe('Viewer Custom Save', function() {
  it('flatten annotations in the getFileData API before saving/downloading', function(client) {
    client
      .loadSample('full-apis/ViewerCustomSaveTest')
      .waitForWVEvent('pageComplete')
      .readerControl('setToolMode', 'AnnotationCreateLine')
      .moveToElement('.pageContainer', 100, 100)
      .mouseButtonDown('left')
      .moveToElement('.pageContainer', 300, 100)
      .mouseButtonUp('left')
      .saveAndReload()
      .readerControl('annotManager', 'getAnnotationsList', function(annotations) {
        assert.equal(annotations.length, 0);
      });
  });
});