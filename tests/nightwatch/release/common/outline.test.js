const assert = require('assert');
const getFileType = require('../../utils/getFileType');

module.exports = function(fileName) {
  const fileType = getFileType(fileName);

  describe('Outline', function() {
    beforeEach(function(client, done) {
      client
        .readerControl('loadDocument', `/samples/files/${fileName}`)
        .waitForWVEvent('pageComplete')
        .readerControl('openElement', 'outlinesPanel')
        // wait for the left panel to be fully opened
        .pause(500, done);
    });
  
    it(`click a top-level outline in a ${fileType} file`, function(client) {
      client
        .click('.Outline')
        .readerControl('getCurrentPageNumber', function(currentPage) {
          assert.equal(currentPage, 5);
        });
    });
  
    it(`click a nested outline in a ${fileType} file`, function(client) {
      // expand all the outlines by clicking on all the arrows
      // and then choose a nested outline to click
      client
        .elements('css selector', '.Outline .arrow', function({ value: arrowIds }) {
          arrowIds.forEach(function({ ELEMENT: id }) {
            client.elementIdClick(id);
          });
        })
        .elements('css selector', '.Outline', function ({ value: outlineIds }) {
          client
            .elementIdClick(outlineIds[5].ELEMENT)
            .readerControl('getCurrentPageNumber', function (currentPage) {
              assert.equal(currentPage, 6);
            });
        });
    });
  });
};
