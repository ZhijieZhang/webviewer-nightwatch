describe('User and permissions', function() {
  beforeEach(function(client, done) {
    client
      .loadSample('annotation/users-and-permissions')
      .waitForWVEvent('pageComplete', done);
  });

  it('should be able to create/reply/edit/delete any annotations if user is an admin', function(client) {

  });

  it('should be able to create/reply any annotations, but only allowed to edit/delete his/her own annotations if user is an user', function(client) {

  });

  it('should not be able to create/reply/edit/delete any annotations if user is in read only mode', function(client) {
    
  });
});