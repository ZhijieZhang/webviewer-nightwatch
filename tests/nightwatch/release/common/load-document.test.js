module.exports = function(doc1, doc2) {
  const type = /\.xod(&|$|\?|#)/i.test(doc1) ? 'XOD' : 'PDF';

  describe(`Load ${type} Document`, function() {
    it(`load ${doc1} using constructor options`, function(client) {
      client
        .setUrlWithOptions({ initialDoc: `/samples/files/${doc1}` })
        .waitForWVEvent('pageComplete');
    });
  
    it(`load ${doc1} using loadDocument API`, function(client) {
      client
        .readerControl('loadDocument', `/samples/files/${doc1}`)
        .waitForWVEvent('pageComplete');
    });
  
    it(`load ${doc1}, ${doc2} back and forth using loadDocument API`, function(client) {
      client
        .readerControl('loadDocument', `/samples/files/${doc1}`)
        .waitForWVEvent('pageComplete')
        .readerControl('loadDocument', `/samples/files/${doc2}`)
        .waitForWVEvent('pageComplete')
        .readerControl('loadDocument', `/samples/files/${doc1}`)
        .waitForWVEvent('pageComplete')
        .readerControl('loadDocument', `/samples/files/${doc2}`)
        .waitForWVEvent('pageComplete');
    });
  });
};