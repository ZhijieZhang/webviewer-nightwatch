exports.command = function(options, callback = () => {}) {
  this.execute(
    function(options) {
      // search the query key in the url and replace its value with the new value
      // if the key is not found and the new value is truthy, append the key value to the end of the url  
      window.replaceQueryValue = function(url, key, newValue) {
        let result = url;
      
        if (url.match(new RegExp(`${key}=`))) {
          if (url.match(new RegExp(`${key}=\.\+\?&`))) {
            result = url.replace(new RegExp(`\(${key}=\)\.\+\?&`), newValue ? `$1${newValue}&` : '&');
          } else {
            result = url.replace(new RegExp(`\(${key}=\)\.\+\?\$`), newValue ? `$1${newValue}` : '');
          }
        } else if (newValue) {
          result += `&${key}=${newValue}`;
        }
      
        return result;
      };
      // each key of the map is a constructor option
      // the value of the key is an object in the shape of:
      // key: map the constructor option key to the query key that will be added to the iframe url
      // getValue: a function that takes the value of a constructor option and returns the value of the query key that will be added to the iframe url
      // for example:
      // { initialDoc: '/test.pdf', fullAPI: true } => '#d=/test.pdf&pdfnet=true'
      window.constructorOptionQueryKeyValueMap = {
        initialDoc: {
          key: '#d',
          getValue: value => value
        },
        pdftronServer: {
          key: 'pdftronServer',
          getValue: value => window.encodeURIComponent(value)
        },
        useDownloader: {
          key: 'useDownloader',
          getValue: value => value
        },
        fullAPI: {
          key: 'pdfnet',
          getValue: value => value
        },
        enableRedaction: {
          key: 'enableRedaction',
          getValue: value => value
        }
      };

      window.location.href = Object
        .keys(window.constructorOptionQueryKeyValueMap)
        .reduce(function(url, optionKey) {
          const optionValue = options[optionKey];
          
          if (optionValue !== undefined) {
            const { key, getValue } = window.constructorOptionQueryKeyValueMap[optionKey];
            return window.replaceQueryValue(url, key, getValue(optionValue));
          }

          return url;
        }, window.location.href);
    },

    [options],

    () => {
      callback.call(this);
    }
  );

  return this;
};