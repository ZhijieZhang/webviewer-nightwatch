const assert = require('assert');

describe('Realtime Collaboration', function() {
  const timeToWaitForPromptDialog = 4000;
  const user1 = `User${Math.floor(Math.random() * 1000)}`;
  const user2 = `User${Math.floor(Math.random() * 1000)}`;

  it.only('add an annotation in another window and check if the annotation appears in the main window', function(client) {
    client
      .loadSample('annotation/realtime-collaboration')
      .pause(timeToWaitForPromptDialog)
      .setAlertText(user1)
      .acceptAlert()
      .frameParent()
      .executeAsync(function(done) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            window.open(`http://${xhttp.responseText}:3000/samples/annotation/realtime-collaboration/`);
            done();
          }
        };
        xhttp.open('GET', '/ip', true);
        xhttp.send();
      })
      .windowHandles(function({ value }) {
        const [mainWindow, newWindow] = value;

        client
          .switchWindow(newWindow)
          .waitForElementPresent('iframe', 1000)
          .switchToUIFrame()
          .pause(timeToWaitForPromptDialog)
          .setAlertText(user2)
          .acceptAlert()
          .readerControl('setToolMode', 'AnnotationCreateLine')
          .moveToElement('.pageContainer', 100, 100)
          .mouseButtonDown('left')
          .moveToElement('.pageContainer', 300, 100)
          .mouseButtonUp('left')
          .switchWindow(mainWindow)
          .switchToUIFrame()
          .execute(
            function(user2) {
              const annotManager = window.readerControl.docViewer.getAnnotationManager();
              return annotManager.getAnnotationsList().filter(function(annot) {
                annot.Author === user2;
              }).length !== 0;
            }, 
            
            [user2], 
            
            function(found) {
              assert.ok(found);
            }
          );
      });
  });
});