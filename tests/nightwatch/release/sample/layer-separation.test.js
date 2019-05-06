describe('Layer Separation', function() {
  const layers = [
    'Architecture',
    'Equipment',
    'Electrical',
    'HVAC',
    'Pipe'
  ];

  beforeEach(function(client, done) {
    client
      .loadSample('pdf-manipulation/layer-separation')
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
        .waitForElementNotVisible('.LoadingModal')  
        .assert.screenshot('.DocumentContainer', `layer-${layerOn.toLowerCase()}.png`);
    });
  });
});