module.exports = {
  elements: {
    focusBlurInput: {
      selector: '#Focus\\/Blur input[type="text"]' 
    },
    enterExitInput: {
      selector: '#Enter\\/Exit input[type="text"]'
    },
    downUpInput: {
      selector: '#Down\\/Up input[type="text"]'
    },
    textField: {
      selector: '#TextField input[type="text"]'
    },
    checkbox: {
      selector: '#Button'
    },
    choiceField: {
      selector: '#Combo\\ Box select'
    },
    listField: {
      selector: '#List\\ Box select'
    },
    checkboxWithAlert: {
      selector: '#Alert\\ Button' 
    },
    documentContainer: {
      selector: '[data-element="documentContainer"]'
    }
  },
  commands: [
    {
      mouseDown: function(button, element) {
        this.moveToElement(element, 5, 5);
        this.api.mouseButtonDown(button);

        return this;
      }
    },
    {
      mouseUp: function(button) {
        this.api.mouseButtonUp(button);

        return this;
      }
    }
  ]
};