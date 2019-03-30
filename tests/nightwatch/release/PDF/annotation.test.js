const getAnnotationToolNames = require('../../utils/getAnnotationToolNames');

describe('Annotation', function() {
  it.only('draw each type of annotation successfully', function(client) {
    getAnnotationToolNames(client, function(toolNames) {
      toolNames = toolNames.filter(toolName => toolName !== 'AnnotationCreateStamp')
      console.log(toolNames);
      toolNames.forEach(function(toolName) {
        client
          .readerControl('setToolMode', toolName)
          .pause(1000)
      });
    });
  });
});