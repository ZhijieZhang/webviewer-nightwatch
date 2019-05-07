module.exports = {
  // controls the timeout time for async hooks. Expects the done() callback to be invoked within this time
  // or an error is thrown
  // set it to 1 min so people can have enough time to compare the diff screenshots if the assertion fails 
  'asyncHookTimeout': 60000,

  // this variable will be set every time we successfully switch into an iframe by calling the switchToUIFrame command
  // and reset to null after each test finishes
  // the information in this object is used by the captureElementScreenshot command to determine if we are inside an iframe 
  // to get the correct position of the element we want to take screenshot about
  iframe: null,
};