describe('Logical Structure', function() {
  it('traverse the structure and content of a tagged PDF document', function(client) {
    client
      .loadSample('full-apis/LogicalStructureTest')
      .waitForConsoleLog([
        'Done 1.',
        'Done 2.',
        'Done 3.'
      ], 1000000);
  });
});