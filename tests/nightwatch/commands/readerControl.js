exports.command = function(...args) {
  const callback = args[args.length - 1];

  this.execute(
    function([apiName, ...apiArgs]) {
      const docViewer = window.readerControl.docViewer;
      const annotManager = docViewer.getAnnotationManager();
      const nameSpace =
        window.readerControl[apiName]
          ? window.readerControl
          : docViewer[apiName]
            ? docViewer
            : annotManager;

      return nameSpace[apiName](...apiArgs);
    }, 

    [args], 
    
    result => { 
      if (typeof callback === 'function') {
        callback.call(this, result && result.value);
      }
    }
  );

  return this;
};