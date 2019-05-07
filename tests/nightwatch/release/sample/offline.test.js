// forcing the computer to be offline programmatically doesn't seems to possible using nightwatch
// so this test only tests putting files into ServiceWorker, it doesn't test if files in the ServiceWorker can be loaded while offline
describe('Offline', function() {
  it('use ServiceWorker to cache WebViewer files', function(client) {
    client
      .loadSample('advanced/offline')
      .frameParent()
      .click('#documents button')
      .click('#documents button')
      .switchToUIFrame()
      .waitForWVEvent('pageComplete');
  });
});