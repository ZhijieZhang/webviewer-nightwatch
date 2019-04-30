const loadViewingSampleClientOnly = require('../utils/loadViewingSampleClientOnly');
const importTests = require('../utils/importTests');

// https://docs.google.com/spreadsheets/d/1uKew8HEje2nI1Gt7IZ390qihWviYIBDD80D-cb88NqE/edit#gid=0
describe('WebViewer Release Test', function() {
  describe('PDF', function() {
    beforeEach(function(client, done) {
      loadViewingSampleClientOnly(client, done);
    });

    afterEach(function(client, done) {
      client.end(() => done());
    });

    importTests([
      ['./common/load-document.test.js', 'sample.pdf', 'sample-annotated.pdf'],
      './PDF/linearized.test.js',
      './PDF/non-linearized.test.js',
      './PDF/encrypted.test.js',
      './PDF/javascript.test.js',
      './PDF/substituted-font.test.js',
      './PDF/invalid-key.test.js',
      './PDF/annotation.test.js',
      './PDF/form.test.js',
      './PDF/text-selection.test.js',
      './PDF/outline.test.js',
      './PDF/layout-mode.test.js'
    ]);
  });

  describe.only('XOD', function() {
    beforeEach(function(client, done) {
      loadViewingSampleClientOnly(client, done);
    });

    afterEach(function(client, done) {
      client.end(() => done());
    });

    importTests([
      ['./common/load-document.test.js', 'sample.xod', 'sample-annotated.xod']
    ]);
  });

  // describe('Samples', function() {

  // })
});

