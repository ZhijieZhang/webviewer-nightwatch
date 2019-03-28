exports.command = function(apiName, ...args) {
  const callback = args[args.length - 1];

  this.execute(
    function(apiName, args) {
      window = window[0] || window;
      return window.readerControl[apiName](...args);
    }, 

    [apiName, args], 
    
    result => { 
      if(typeof callback === 'function') {
        callback.call(this, result)
      }
    }
  );

  return this;
}