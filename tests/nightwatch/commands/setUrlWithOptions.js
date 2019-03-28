exports.command = function(options, callback) {
  this.execute(
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

      if (options.useDownloader !== undefined) {
        const useDownloader = options.useDownloader ? 'true' : 'false';

        if (url.match(/useDownloader=/)) {
          if (url.match(/useDownloader=.+?&/)) {
            url = url.replace(/(useDownloader=).+?&/, `$1${useDownloader}&`);
          } else {
            url = url.replace(/(useDownloader=).+?$/, `$1${useDownloader}`);
          }
        } else if (useDownloader) {
          url += `&useDownloader=${useDownloader}`;
        }
      }
  
      window.location.href = url;
    },

    [options],

    () => {
      if (typeof callback === 'function') {
        callback.call(this);
      }
    }
  );

  return this;
}