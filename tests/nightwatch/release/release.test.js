const importTests = require('../utils/importTests');

// https://docs.google.com/spreadsheets/d/1uKew8HEje2nI1Gt7IZ390qihWviYIBDD80D-cb88NqE/edit#gid=0
describe('WebViewer Release Test', function() {
  describe('PDF', function() {
    beforeEach(function(client, done) {
      client 
        .loadSample('viewing/viewing')
        .setUrlWithOptions({ 
          pdftronServer: '' 
        })
        .waitForWVEvent('pageComplete', done);
    });

    afterEach(function(client, done) {
      client.end(() => done());
    });

    importTests([
      ['./common/load-document.test.js', 'sample.pdf', 'sample-annotated.pdf'],
      ['./common/annotation.test.js', 'sample.pdf'],
      ['./common/form.test.js', 'form.pdf'],
      './PDF/linearized.test.js',
      './PDF/non-linearized.test.js',
      './PDF/encrypted.test.js',
      './PDF/javascript.test.js',
      './PDF/substituted-font.test.js',
      './PDF/invalid-key.test.js',
      './PDF/text-selection.test.js',
      './PDF/outline.test.js',
      './PDF/layout-mode.test.js'
    ]);
  });

  describe('XOD', function() {
    beforeEach(function(client, done) {
      client 
        .loadSample('viewing/viewing')
        .setUrlWithOptions({
          initialDoc: '/samples/files/sample.xod', 
          pdftronServer: '' 
        })
        .waitForWVEvent('pageComplete', done);
    });

    afterEach(function(client, done) {
      client.end(() => done());
    });

    importTests([
      ['./common/load-document.test.js', 'sample.xod', 'sample-annotated.xod'],
      ['./common/annotation.test.js', 'sample.xod'],
      ['./common/form.test.js', 'form.xod']
    ]);
  });

  // describe('Samples', function() {

  // })
});

