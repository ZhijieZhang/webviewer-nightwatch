exports.command = function(apiName, ...args) {
  const me = this;
  const callback = args[args.length - 1];

  this.getAttribute('iframe', 'id', function(result) {
    this
    .frame(result.value)
    .execute(
      function(apiName, args) {
        window = window[0] || window;
        return window.readerControl[apiName](...args);
      }, 
    
      [apiName, args], 
      
      function(result) { 
        if(typeof callback === 'function') {
          callback.call(me, result)
        }
      }
    );
  })

  return this;
}