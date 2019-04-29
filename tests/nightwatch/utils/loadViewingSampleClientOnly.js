const loadViewingSampleClientOnly = (client, done) => {
  client
    .resizeWindow(1280, 960)
    .url('http://localhost:3000/samples/viewing/viewing/')
    .waitForElementVisible('iframe', 1000)
    .switchToUIFrame()
    .setUrlWithOptions({ pdftronServer: '' })
    .waitForWVEvent('pageComplete', done);
}

module.exports = loadViewingSampleClientOnly;