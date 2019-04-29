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
      './PDF/normal.test.js',
      './PDF/linearized.test.js',
      './PDF/non-linearized.test.js',
      './PDF/encrypted.test.js',
      './PDF/javascript.test.js',
      './PDF/substituted-font.test.js',
      './PDF/annotation.test.js',
      './PDF/form.test.js',
      './PDF/text-selection.test.js',
      './PDF/outline.test.js'
    ]);
  });

  // describe('XOD', function() {
  //   beforeEach(function(client, done) {
  //     loadViewingSampleClientOnly(client, done);
  //   });

  //   afterEach(function(client, done) {
  //     client.end(() => done());
  //   });
  // })

  // describe('Samples', function() {

  // })
});

