const importTests = require('../utils/importTests');
const assert = require('assert');
// https://docs.google.com/spreadsheets/d/1uKew8HEje2nI1Gt7IZ390qihWviYIBDD80D-cb88NqE/edit#gid=0
describe('WebViewer Release Test', function() {
  afterEach(function(client, done) {
    client.globals.iframe = null;
    client.end(() => done());
  });

  describe('PDF', function() {
    beforeEach(function(client, done) {
      client 
        .loadSample('viewing/viewing')
        .setUrlWithOptions({ 
          pdftronServer: '' 
        })
        .waitForWVEvent('pageComplete', done);
    });

    it.only('click a nested outline in a file', function(client) {
      // expand all the outlines by clicking on all the arrows
      // and then choose a nested outline to click
      client
        .readerControl('loadDocument', '/samples/files/outlines-nested.pdf')
        .waitForWVEvent('pageComplete')
        .readerControl('openElement', 'outlinesPanel')
        // wait for the left panel to be fully opened
        .pause(500)
        .elements('css selector', '.Outline .arrow', function({ value: arrows }) {
          arrows.forEach(function(arrow) {
            const id = Object.values(arrow)[0];
            client.elementIdClick(id);
          });
        })
        .elements('css selector', '.Outline', function ({ value: outlines }) {
          client
            .elementIdClick(Object.values(outlines[5])[0])
            .readerControl('getCurrentPageNumber', function (currentPage) {
              assert.equal(currentPage, 6);
            });
        });
    });

    // importTests([   
    //   './PDF/linearized.test.js',
    //   './PDF/non-linearized.test.js',
    //   './PDF/encryption.test.js',
    //   './PDF/javascript.test.js',
    //   './PDF/substituted-font.test.js',
    //   './PDF/invalid-key.test.js',
    //   ['./common/text-selection.test.js'],
    //   ['./common/print.test.js'],
    //   ['./common/load-document.test.js', 'sample.pdf', 'sample-annotated.pdf'],
    //   ['./common/annotation.test.js', 'sample.pdf'],
    //   ['./common/form.test.js', 'form.pdf'],
    //   ['./common/outline.test.js', 'outlines-nested.pdf'],
    //   ['./common/layout-mode.test.js', 'webviewer-demo-annotated.pdf']
    // ]);
  });

  describe.skip('XOD', function() {
    beforeEach(function(client, done) {
      client 
        .loadSample('viewing/viewing')
        .setUrlWithOptions({
          initialDoc: '/samples/files/webviewer-demo-annotated.xod', 
          pdftronServer: '' 
        })
        .waitForWVEvent('pageComplete', done);
    });

    importTests([
      ['./common/print.test.js'],
      ['./common/text-selection.test.js'],
      ['./common/load-document.test.js', 'sample.xod', 'sample-annotated.xod'],
      ['./common/annotation.test.js', 'sample.xod'],
      ['./common/form.test.js', 'form.xod'],
      ['./common/outline.test.js', 'outlines-nested.xod'],
      ['./common/layout-mode.test.js', 'webviewer-demo-annotated.xod'],
    ]);
  });

  describe.skip('Samples', function() {
    importTests([
      './sample/legacy-viewing.test.js',
      './sample/users-and-permissions.test.js',
      './sample/realtime-collaboration.test.js',
      './sample/custom-annotations.test.js',
      './sample/ui-customization.test.js',
      './sample/form-customization.test.js',
      './sample/i18n.test.js',
      './sample/page-operations.test.js',
      './sample/layer-separation.test.js',
      './sample/color-separation.test.js',
      './sample/XOD.test.js',
      './sample/text-position.test.js',
      './sample/redaction.test.js',
      './sample/diff-documents.test.js',
      './sample/measurement.test.js',
      './sample/offline.test.js',
      './sample/flipbook.test.js',
      './sample/custom-save.test.js',
      './sample/display-points.test.js',
      './sample/edit.test.js',
      './sample/preprocess.test.js',
      './sample/PDF-diff.test.js',
      './sample/snap-to-nearest.test.js',
      './sample/deck.test.js',
      './sample/add-image.test.js',
      './sample/bookmark.test.js',
      './sample/content-replacer.test.js',
      './sample/digital-signature.test.js',
      './sample/element-builder.test.js',
      './sample/element-edit.test.js',
      './sample/element-reader.test.js',
      './sample/encryption.test.js',
      './sample/XFDF-import.test.js',
      './sample/interactive-forms.test.js',
      './sample/logical-structure.test.js',
      './sample/office-to-PDF.test.js',
      './sample/PDFA.test.js',
      './sample/PDF-draw.test.js',
      './sample/PDF-layer.test.js',
      './sample/PDF-page.test.js',
      './sample/PDF-redaction.test.js',
      './sample/PDF-rect.test.js',
      './sample/SDF.test.js',
      './sample/stamper.test.js',
      './sample/text-extract.test.js',
      './sample/text-search.test.js'
    ]);
  });
});

