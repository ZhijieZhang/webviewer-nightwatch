describe('Color Separation', function() {
  const colors = [
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

  colors.forEach(function(colorOn) {
    it(`${colorOn} color`, function(client) {
      const otherColors = colors.filter(function(layer) {
        return layer !== colorOn;
      });
  
      otherColors.forEach(function(color) {
        client.click(`input[id="${color}"]`);
      });

      client
        .switchToUIFrame()
        .waitForElementNotVisible('.LoadingModal')  
        .assert.screenshot('.DocumentContainer', `color-${colorOn.toLowerCase().replace(/ /g, '-')}.png`);
    });
  });
});