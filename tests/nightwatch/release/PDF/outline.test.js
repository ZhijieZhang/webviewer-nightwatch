const assert = require('assert');

describe('Outline', function() {
  beforeEach(function(client, done) {
    client
      .readerControl('loadDocument', '/samples/files/outlines-nested.pdf')
      .waitForWVEvent('pageComplete')
      .readerControl('openElement', 'outlinesPanel')
      .pause(500, done);
  });

  it('click a top-level outline', function(client) {
    client
      .click('.Outline')
      .readerControl('getCurrentPageNumber', function(currentPage) {
        assert.equal(currentPage, 5);
      });
  });

  it.only('click a nested outline', function(client) {
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