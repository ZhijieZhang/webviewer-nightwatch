// forcing the computer to be offline programmatically doesn't seems to possible using nightwatch
// so this test only tests putting files into ServiceWorker, it doesn't test if files in the ServiceWorker can be loaded while offline
// the chrome browser in lambdaTest doesn't support service worker. So skipping for now.
describe.skip('Offline', function() {
  it('use ServiceWorker to cache WebViewer files', function(client) {
    client
      .loadSample('advanced/offline')
      .frameParent()
      .click('#documents li:nth-of-type(3) button')
      .click('#documents li:nth-of-type(3) button')
      .switchToUIFrame()
      .waitForWVEvent('pageComplete');
  });
});