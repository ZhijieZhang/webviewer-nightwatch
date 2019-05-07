// execute the callback function with a PDF buffer array after seeing message logged in console
// this command is specifically targeted to be used for testing console-based samples
exports.command = function (message, ...args) {
  let timeoutInMilliseconds, 
      callback = () => {};
  if (args.length === 1) {
    typeof args[0] === 'function' 
      ? callback = args[0]
      : timeoutInMilliseconds = args[0];
  } else if (args.length === 2) {
    timeoutInMilliseconds = args[0];
    callback = args[1];
  }

  // so far all the console-based samples use a function saveBufferAsPDFDoc to save the PDF to disk after the sample is finished
  // however if the file is saved to the disk then there's nothing more we can do with it
  // so we override the function to attach the buffer to the window and grab it after seeing the message in the console
  this
    .execute(
      function () {
        window.saveBuffer = function (buffer, filename, mimeType) {
          (window.buffers = window.buffers || []).push({buffer, mimeType});
        };
      }
    )
    .waitForConsoleLog(message, timeoutInMilliseconds)
    .execute(
      function() {
        return window.buffers;
      },

      [],

      function(result) {
        callback.call(this, result && result.value);
      }
    );
};