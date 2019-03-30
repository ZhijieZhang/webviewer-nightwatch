const getAnnotationToolNames = (client, callback) => {
  client
    .execute(
      function() {
        const tools = window.readerControl.docViewer.getToolModeMap();
        const annotationToolNames = Object.keys(tools).filter(toolName => {
          const tool = tools[toolName];
          
          return tool instanceof window.Tools.GenericAnnotationCreateTool || 
                tool instanceof window.Tools.TextAnnotationCreateTool || 
                tool.defaults;
        })

        return annotationToolNames;
      },
      
      [],

      function(result) {
        if (typeof callback === 'function') {
          callback(result.value)
        }
      }
    )
}

module.exports = getAnnotationToolNames;