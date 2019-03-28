exports.command = function(options) {
  const me = this;

  this.getAttribute('iframe', 'id', function(result) {
    me
    .frame(result.value)
    .execute(
      function(options) {
        window = window[0] || window;
        let url = window.location.href;
    
        if (options.initialDoc !== undefined) {
          url = url.replace(/(#d=).+?&/, `$1${options.initialDoc}&`);
        }
        if (options.pdftronServer !== undefined) {
          const encodedPath = window.encodeURIComponent(options.pdftronServer);
    
          if (url.match(/pdftronServer=/)) {
            if (url.match(/pdftronServer=.+?&/)) {
              url = url.replace(/(pdftronServer=).+?&/, encodedPath ? `$1${encodedPath}&` : '&');
            } else {
              url = url.replace(/(pdftronServer=).+?$/, encodedPath ? `$1${encodedPath}` : '');
            }
          } else if (encodedPath) {
            url += `&pdftronServer=${encodedPath}`;
          }
        }
    
        window.location.href = url;
      },

      [options]
    );
  })

  return this;
}