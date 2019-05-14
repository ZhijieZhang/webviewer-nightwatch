const getFileType = require('../../utils/getFileType');

module.exports = function(doc1, doc2) {
  const fileType = getFileType(doc1);

  describe(`Load ${fileType} Document`, function() {
    it(`load ${doc1} using loadDocument API`, function(client) {
      client
        .readerControl('loadDocument', `/samples/files/${doc1}`, {
          waitForWVEvent: 'pageComplete'
        });
    });
  
    it(`load ${doc1}, ${doc2} back and forth using loadDocument API`, function(client) {
      client
        .readerControl('loadDocument', `/samples/files/${doc1}`, {
          waitForWVEvent: 'pageComplete'
        })
        .readerControl('loadDocument', `/samples/files/${doc2}`, {
          waitForWVEvent: 'pageComplete'
        })
        .readerControl('loadDocument', `/samples/files/${doc1}`, {
          waitForWVEvent: 'pageComplete'
        })
        .readerControl('loadDocument', `/samples/files/${doc2}`, {
          waitForWVEvent: 'pageComplete'
        });
    });
  });
};