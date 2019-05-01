// this test is testing 
// a) the setLanguage API of the UI is working
// b) text in the menu overlay is translated correctly
// it DOES NOT test all the text that should be translated in the UI are being translated
// since it's a lot of work and it makes more sense for such a test to be part of the UI repo
describe('Internationalization', function() {
  const languages = ['fr', 'zh_cn'];

  languages.forEach(function(language) {
    it(`${language}`, function(client) {

      client
        .loadSample('customization/internationalization')
        .waitForWVEvent('pageComplete')
        .click('[data-element="menuButton"]')
        .readerControl('setLanguage', language)
        // wait 100ms here for text re-rendering to another language
        .pause(100)
        .assert.screenshot('[data-element="menuOverlay"]', `i18n-${language}.png`);
    });
  });
});