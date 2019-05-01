describe.only('Color Separation', function() {
  const layers = [
    'PANTONE 1375 C',
    'PANTONE 288 C',
    'PANTONE 299 C',
    'PANTONE 1505 C',
    'TOYO 0203',
    'PANTONE 8843 C',
    'Black',
    'Yellow',
    'Magenta',
    'Cyan',
  ];

  beforeEach(function(client, done) {
    client
      .loadSample('pdf-manipulation/color-separation')
      .waitForWVEvent('pageComplete')
      .frameParent(function() {
        done();
      });
  });

  layers.forEach(function(layerOn) {
    it(`${layerOn} layer`, function(client) {
      const otherLayers = layers.filter(function(layer) {
        return layer !== layerOn;
      });
  
      otherLayers.forEach(function(layer) {
        client.click(`input[id="${layer}"]`);
      });

      client
        .switchToUIFrame()
        .waitForWVEvent('pageComplete')
        .waitForElementNotVisible('.LoadingModal', 5000)  
        .assert.screenshot('.DocumentContainer', `color-${layerOn.toLowerCase().replace(/ /g, '-')}.png`);
    });
  });
});