exports.command = function(...args) {
  const callback = args[args.length - 1];

  this.execute(
    function(args) {
      window = window[0] || window;
      let obj,
          apiName,
          apiArgs;

      if (
        args[0] === 'docViewer' ||
        args[0] === 'annotManager'
      ) {
        obj = args[0] === 'docViewer' 
          ? window.docViewer
          : window.docViewer.getAnnotationManager();
        apiName = args[1];
        apiArgs = args.slice(2);
      } else {
        obj = window.readerControl;
        [apiName, ...apiArgs] = args;
      }

      return obj[apiName](...apiArgs);
    }, 

    [args], 
    
    result => { 
      if(typeof callback === 'function') {
        callback.call(this, result && result.value);
      }
    }
  );

  return this;
};