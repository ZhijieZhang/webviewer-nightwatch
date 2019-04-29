describe('Form', function() {
  it('can change the values of each type of form field in the document and the values are the same after reloading the PDF', function(client) {
    client
      .readerControl('loadDocument', '/samples/files/form.pdf')     
      .waitForWVEvent('annotationsLoaded')
      .pause(50000)
  })
})