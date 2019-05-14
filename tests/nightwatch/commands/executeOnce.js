const assert = require('assert');
const EventEmitter = require('events');

class ExecuteOnce extends EventEmitter {
  constructor() {
    super();
  }

  command({
    readerControl: [apiName, ...apiArgs],
    waitForWVEvent: eventToWait
  }, callback = () => {}) {
    this.api.executeAsync(
      function(apiName, apiArgs, eventToWait, done) {
        const docViewer = window.readerControl.docViewer;
        const annotManager = docViewer.getAnnotationManager();
        const apiNameSpace = 
          window.readerControl[apiName]
          ? window.readerControl
          : docViewer[apiName]
            ? docViewer
            : annotManager;
        const eventToNameSpaceMap = {
          pageComplete: docViewer,
          annotationsLoaded: docViewer,
          annotationChanged: annotManager
        };

        let result;    
        if (eventToWait) {
          let eventCounter = 0;
          eventToWait = typeof eventToWait === 'string' ? [eventToWait] : eventToWait;

          eventToWait.forEach(function(event) {
            if (event === 'annotationsLoaded') {
              docViewer.one('documentLoaded', function() {
                docViewer.one('annotationsLoaded', function() {
                  eventCounter++;
                  if (eventCounter === eventToWait.length) {
                    done(result);
                  }
                });
              });
            } else {
              eventToNameSpaceMap[event].one(event, function() {
                eventCounter++;
                if (eventCounter === eventToWait.length) {
                  done(result);
                }
              });
            }

            result = apiNameSpace[apiName](...apiArgs);
          });
        } else {
          result = apiNameSpace[apiName](...apiArgs);
          done(result);
        }
      }, 

      [apiName, apiArgs, eventToWait], 
      
      result => { 
        callback.call(this.api, result && result.value);
        return this.emit('complete');
      }
    );
  }
}

module.exports = ExecuteOnce;