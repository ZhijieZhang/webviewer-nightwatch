exports.command = function(...args) {
  const apiName = args[0];
  const lastArg = args[args.length - 1];

  let apiArgs, options;
  if (
    typeof lastArg === 'object' &&
    (lastArg.waitForWVEvent || lastArg.callback)
  ) {
    options = Object.assign({}, lastArg);
    apiArgs = args.slice(1, args.length - 1);
  } else if (typeof lastArg === 'function') {
    options = {
      callback: lastArg
    };
    apiArgs = args.slice(1, args.length - 1);
  } else {
    options = {};
    apiArgs = args.slice(1);
  }

  this
    .executeAsync(
      function(apiName, apiArgs, eventToWait, done) {
        const docViewer = window.readerControl.docViewer;
        const annotManager = docViewer.getAnnotationManager();
        const eventToNameSpaceMap = {
          pageComplete: docViewer,
          annotationsLoaded: docViewer,
          annotationChanged: annotManager 
        };
        const nameSpace = 
          window.readerControl[apiName]
          ? window.readerControl
          : docViewer[apiName]
            ? docViewer
            : annotManager;

        let result;    
        if (eventToWait) {
          if (eventToWait === 'annotationsLoaded') {
            docViewer.one('documentLoaded', function() {
              docViewer.one('annotationsLoaded', function() {
                done(result);
              });
            });
          } else {
            eventToNameSpaceMap[eventToWait].one(eventToWait, function() {
              done(result);
            });
          }
          result = nameSpace[apiName](...apiArgs);
        } else {
          result = nameSpace[apiName](...apiArgs);
          done(result);
        }
      }, 

      [apiName, apiArgs, options.waitForWVEvent], 
      
      result => { 
        if (this.failTimeout) {
          clearTimeout(this.failTimeout);
        }

        if (typeof options.callback === 'function') {
          options.callback.call(this, result && result.value);
        }
      }
    );

  return this;
};