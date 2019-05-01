describe('XOD Sample', function() {
  const urls = [
    'https://pdftron.s3.amazonaws.com/downloads/pl/sheet_music.xod',
    'https://pdftron.s3.amazonaws.com/downloads/pl/encrypted-foobar12.xod'
  ];

  beforeEach(function(client, done) {
    client
      .loadSample('advanced/xod')
      .waitForWVEvent('pageComplete')
      .frameParent(function() {
        done();
      });
  });

  urls.forEach(function(url) {
    it(`load XOD file from ${url}`, function(client) {
      client
        .click(`#select option[value="${url}"]`)
        .switchToUIFrame()
        .waitForWVEvent('pageComplete');
    });
  });
});