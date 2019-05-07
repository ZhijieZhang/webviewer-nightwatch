describe.only('User and permissions', function() {
  let userPermission;

  beforeEach(function(client, done) {
    userPermission = client.page.userPermission();

    client
      .loadSample('annotation/users-and-permissions')
      .readerControl('disableElement', 'zoomOverlayButton')
      .waitForWVEvent('pageComplete', done)
      .frameParent();
  });

  it('should be able to create/reply/edit/delete any annotations if user is an admin', function(client) {
    userPermission.click('@admin');
    client.switchToUIFrame();
    userPermission
      .selectAnnotationByIndex(0)
      .assert.screenshot('.App', 'user-permissions-admin.test.png');
  });

  it('should be able to create/reply any annotations, but only allowed to edit/delete his/her own annotations if user is an user', function(client) {
    userPermission.click('@user');
    client.switchToUIFrame();
    userPermission
      .selectAnnotationByIndex(0)
      .assert.screenshot('.App', 'user-permissions-user.test.png');
  });

  it('should not be able to create/reply/edit/delete any annotations if user is in read only mode', function(client) {
    userPermission.click('@readOnly');
    client
      .switchToUIFrame()
      .assert.screenshot('.App', 'user-permissions-read-only.test.png');
  });

  it('should not show annotations created by other users', function(client) {
    userPermission
      .click('@user')
      .click('@showOtherUsersAnnotations');
    client
      .switchToUIFrame()
      .assert.screenshot('.App', 'user-permissions-other-annotations.test.png');
  });
});