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
    textWidget: {
      selector: '#TextField input[type="text"]'
    },
    checkBtnWidget: {
      selector: '#Button'
    },
    choiceWidget: {
      selector: '#Combo\\ Box select'
    },
    listWidget: {
      selector: '#List\\ Box select'
    },
    checkBtnWidgetWithAlert: {
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
}