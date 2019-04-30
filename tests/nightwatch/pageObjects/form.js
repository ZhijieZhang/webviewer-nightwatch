module.exports = {
  elements: {
    textField: {
      selector: '#Feld\\.2 input[type="text"]'
    },
    passwordField: {
      selector: '#Feld\\.9 input[type="text"]'
    },
    // a text field of which the value will be used to calculate
    // the total price
    quantityTextField: {
      selector: '#Bestell\\.Menge\\.1 input[type="text"]'
    },
    // a text field of which the value will be converted to currency format
    // for example: 12345 -> $12,345.00
    currencyTextField: {
      selector: '#Format\\.zahl input[type="text"]'
    },
    // a text field of which the value will be converted to date format
    // for example: 1.1.2004 -> Jan 1, 2004
    dateTextField: {
      selector: '#Format\\.datum input[type="text"]'
    },
    // a text field of which the value will be converted to percentage format
    // for example: 0.123 -> 12.30%
    percentTextField: {
      selector: '#Format\\.pro input[type="text"]'
    },
    multilineTextField: {
      selector: '#Feld\\.1 textarea'
    },
    radioBox: {
      selector: '#Feld\\.3 input[type="radio"]'
    },
    checkbox: {
      selector: '#Feld\\.7 input[type="checkbox"]'
    },
    choiceFieldFirstOption: {
      selector: '#Feld\\.4 select option[value="1"]'
    },
    listFieldFirstOption: {
      selector: '#Feld\\.5 select option[value="1"]'
    }
  },
  commands: [
    {
      // this command is a workaround for the native clearValue API
      // https://github.com/nightwatchjs/nightwatch/issues/1132
      clear: function(element) {
        this.getValue(element, function({ value }) {
          for (let c in value) {
            this.setValue(element, this.api.Keys.BACK_SPACE);
          }
        }.bind(this));

        return this;
      }
    }
  ]
};