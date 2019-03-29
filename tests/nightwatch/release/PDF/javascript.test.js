describe('PDF with JavaScript', function() {
  let widgetElements, jsPDF;

  beforeEach(function(client, done) {
    jsPDF = client.page.jsPDF();
    widgetElements = [
      '@textWidget', 
      '@checkBtnWidget',
      '@choiceWidget',
      '@listWidget'
    ];

    client
      .readerControl('loadDocument', '/samples/files/javascript.pdf')
      .waitForWVEvent('annotationsLoaded', done)
  })

  it(`triggers mouseenter/mouseleave events when mouse entering/leaving a widget element`, function() {
    widgetElements.forEach(function(element) {
      jsPDF
        .moveToElement(element, 5, 5)
        .assert.valueContains('@enterExitInput', 'Mouse Enter', `${element} failed to trigger mouseenter event`)
    
      jsPDF
        .moveToElement('@documentContainer', 0, 0)
        .assert.valueContains('@enterExitInput', 'Mouse Exit', `${element} failed to trigger mouseleave event`)
    })
  });

  it('triggers mousedown/mouseup events when performing a mouse click event', function(client) {
    const isMac = process.platform === 'darwin';
    // choiceWidget essentially wraps a <select> and it is excluded when using Mac 
    // because after a mouse left down is performed, an overlay(select options) will be placed on top of the widget 
    // which triggers a mouseup event immediately and changes the input text in the @downUpInput  
    widgetElements = widgetElements.filter(element => isMac ? element !== '@choiceWidget' : true)
    widgetElements.forEach(function(element) {
      jsPDF
        .mouseDown('left', element)
        .assert.valueContains('@downUpInput', 'Mouse Down', `${element} failed to trigger mousedown event`);

      jsPDF
        .mouseUp('left')
        .assert.valueContains('@downUpInput', 'Mouse Up', `${element} failed to trigger mouseup event`);
    })
  })

  it('triggers focus/blur when clicking inside/outside a widget element', function() {
    const isMac = process.platform === 'darwin';
    // also excludes choiceWidget when using Mac here
    // because a outside click when the overlay is open will close it but still keeps the widget focused
    widgetElements = widgetElements.filter(element => isMac ? element !== '@choiceWidget' : true)
    widgetElements.forEach(function(element) {
      jsPDF
        .click(element)
        .assert.valueContains('@focusBlurInput', 'Focus', `${element} failed to trigger focus event`);

      jsPDF
        .click('@documentContainer')
        .assert.valueContains('@focusBlurInput', 'Blur', `${element} failed to trigger mouseup event`);
    })
  })
})