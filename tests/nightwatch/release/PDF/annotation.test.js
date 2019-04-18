// 'AnnotationCreateRedaction'
// 'AnnotationCreateTextHighlight'
// 'AnnotationCreateTextSquiggly'
// 'AnnotationCreateTextStrikeout'
// 'AnnotationCreateTextUnderline'
const path = require('path');
// image to upload when using the stamp tool
const stampImage = path.resolve(__dirname, '../../../../samples/files/stamptest.png');

describe('Annotation', function () {
  it.only('draw each type of annotation successfully', function (client) {
    // width for the annotation drawn by the generic tools, in pixels
    const gAnnotWidth = 40;
    // height for the annotation drawn by the generic tools, in pixels
    const gAnnotHeight = 40;
    // width for the text annotation, in pixels
    // the value 25 is just hard-coded to make sure that all the text tools can have some text to use in the current pdf(sample.pdf)
    // if we tested with another pdf then this value will likely needs to be changed
    const tAnnotWidth = 270;
    // height for the text annotation, in pixels
    const tAnnotHeight = 18;
    // array of objects, in the shape of:
    // toolNames: array of tools that share the same draw function
    // draw: a function that takes the starting x, y and draw the annotation on the annotation canvas
    // note that signature tool is not here since the annotation made by it is just a freehand annotation 
    // and we test freehand annotation using the freehand tool
    const genericTools = [
      {
        toolNames: [
          'AnnotationCreateArrow',
          'AnnotationCreateEllipse',
          'AnnotationCreateFreeHand',
          'AnnotationCreateLine',
          'AnnotationCreateRectangle',
          'AnnotationCreateDistanceMeasurement',
        ],
        draw: function (x, y) {
          client
            .mouseButtonDown('left')
            .moveToElement('.pageContainer', x + gAnnotWidth, y + gAnnotHeight)
            .mouseButtonUp('left')
        }
      },
      {
        toolNames: [
          'AnnotationCreatePolygon',
          'AnnotationCreatePolygonCloud',
          'AnnotationCreatePolyline',
          'AnnotationCreatePerimeterMeasurement',
          'AnnotationCreateAreaMeasurement'
        ],
        draw: function (x, y) {
          client
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + gAnnotWidth, y)
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + gAnnotWidth / 2, y + gAnnotHeight)
            .doubleClick();
        }
      },
      {
        toolNames: ['AnnotationCreateCallout'],
        draw: function (x, y) {
          client
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + gAnnotWidth, y)
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + gAnnotWidth / 2, y + gAnnotHeight / 2)
            .mouseButtonClick()
            // click off the text area to blur it out
            .moveToElement('.pageContainer', 5, 5)
            .doubleClick();
        }
      },
      {
        toolNames: ['AnnotationCreateFreeText'],
        draw: function (x, y) {
          client
            .mouseButtonDown('left')
            .moveToElement('.pageContainer', x + gAnnotWidth, y + gAnnotHeight)
            .mouseButtonUp('left')
            .readerControl('setToolMode', 'AnnotationEdit')
            // click off the text area to blur it out
            .moveToElement('.pageContainer', 5, 5)
            .mouseButtonClick()
        }
      },
      {
        toolNames: ['AnnotationCreateSticky'],
        draw: function (x, y) {
          client
            .mouseButtonClick()
            // in the current UI version, a sticky annotation will be selected
            // and the left panel will open after it is added to the canvas 
            // wait for 1 sec so that the panel will be fully open then close it and deselect the annotation
            .pause(500)
            .readerControl('closeElements', ['leftPanel'])
            .moveToElement('.pageContainer', 5, 5)
            .mouseButtonClick()
        }
      },
      {
        toolNames: ['AnnotationCreateStamp'],
        draw: function (x, y) {
          client
            // if we don't pause then there's a change that the file input can't be found
            .pause(500)
            .mouseButtonClick()
            .setValue('input[type="file"]', stampImage)
        }
      }
    ];
    const textTools = [
      {
        toolNames: [
          // 'AnnotationCreateArrow',
          // 'AnnotationCreateLine',
          // 'AnnotationCreateRectangle',
          // 'AnnotationCreateDistanceMeasurement',


          'AnnotationCreateTextStrikeout',
          'AnnotationCreateTextSquiggly',
          'AnnotationCreateTextHighlight',
          'AnnotationCreateTextUnderline'
        ],
        draw: function(x, y) {
          client
            .mouseButtonDown('left')
            .moveToElement('.pageContainer', x + tAnnotWidth, y + tAnnotHeight)
            .mouseButtonUp('left')
        }
      }
    ];

    client
      .readerControl('loadDocument', '/samples/files/sample.pdf')
      .waitForWVEvent('pageComplete')
      // if we don't wait 500ms then mouse actions will be performed on the progressModal(in the UI we close it asynchronously)
      // and we won't be able to see the annotation drawn in the canvas
      .pause(500, function () {
        textTools.forEach(function({ toolNames, draw }, rowIndex) {
          const initOffsetX = 60,
                initOffsetY = 75,
                gap = 10,
                x = initOffsetX;

          toolNames.forEach(function (toolName, colIndex) {
            const y = initOffsetY + colIndex * (tAnnotHeight + gap);

            client
              .readerControl('setToolMode', toolName)
              .moveToElement('.pageContainer', x, y, function() {
                draw(x, y);
              });
          })
        });

        // genericTools.forEach(function ({ toolNames, draw }, rowIndex) {
        //   const initOffsetX = 5,
        //         initOffsetY = 220,
        //         gap = 20,
        //         y = initOffsetY + rowIndex * (gAnnotHeight + gap);

        //   toolNames.forEach(function (toolName, colIndex) {
        //     const x = initOffsetX + colIndex * (gAnnotWidth + gap);


        //     client
        //       .readerControl('setToolMode', toolName)
        //       .moveToElement('.pageContainer', x, y, function () {
        //         draw(x, y);
        //       });
        //   })
        // });
      })
      .pause(500000)
  });
});