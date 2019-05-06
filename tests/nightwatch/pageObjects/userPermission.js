module.exports = {
  elements: {
    admin: {
      selector: '#justin'
    },
    user: {
      selector: '#sally'
    },
    readOnly: {
      selector: '#brian'
    },
    showOtherUsersAnnotations: {
      selector: '#display'
    }
  },
  commands: [
    {
      selectAnnotationByIndex: function(index) {
        this.api
          .execute(function(index) {
            const annotManager = window.readerControl.docViewer.getAnnotationManager();
            annotManager.selectAnnotation(annotManager.getAnnotationsList()[index]);
          }, [index]);

        return this;
      }
    }
  ]
};