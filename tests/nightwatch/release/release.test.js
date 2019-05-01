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
      './PDF/linearized.test.js',
      './PDF/non-linearized.test.js',
      './PDF/encrypted.test.js',
      './PDF/javascript.test.js',
      './PDF/substituted-font.test.js',
      './PDF/invalid-key.test.js',
      './common/text-selection.test.js',
      ['./common/load-document.test.js', 'sample.pdf', 'sample-annotated.pdf'],
      ['./common/annotation.test.js', 'sample.pdf'],
      ['./common/form.test.js', 'form.pdf'],
      ['./common/outline.test.js', 'outlines-nested.pdf'],
      ['./common/layout-mode.test.js', 'webviewer-demo-annotated.pdf']
    ]);
  });

  describe('XOD', function() {
    beforeEach(function(client, done) {
      client 
        .loadSample('viewing/viewing')
        .setUrlWithOptions({
          initialDoc: '/samples/files/webviewer-demo-annotated.xod', 
          pdftronServer: '' 
        })
        .waitForWVEvent('pageComplete', done);
    });

    afterEach(function(client, done) {
      client.end(() => done());
    });

    importTests([
      './common/text-selection.test.js',
      ['./common/load-document.test.js', 'sample.xod', 'sample-annotated.xod'],
      ['./common/annotation.test.js', 'sample.xod'],
      ['./common/form.test.js', 'form.xod'],
      ['./common/outline.test.js', 'outlines-nested.xod'],
      ['./common/layout-mode.test.js', 'webviewer-demo-annotated.xod'],
    ]);
  });

  describe('Samples', function() {
    afterEach(function(client, done) {
      client.end(() => done());
    });
    
    importTests([
      './sample/legacy-viewing.test.js',
      './sample/users-and-permissions.test.js',
      './sample/custom-annotations.test.js',
      './sample/ui-customization.test.js',
      './sample/form-customization.test.js',
      './sample/i18n.test.js',
      './sample/page-operations.test.js',
      './sample/layer-separation.test.js',
      './sample/color-separation.test.js'
    ]);
  });
});

