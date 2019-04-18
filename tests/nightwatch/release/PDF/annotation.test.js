// 'AnnotationCreateRedaction'
// 'AnnotationCreateTextHighlight'
// 'AnnotationCreateTextSquiggly'
// 'AnnotationCreateTextStrikeout'
// 'AnnotationCreateTextUnderline'
const path = require('path');
// image to upload when using the stamp tool
const stampImage = path.resolve(__dirname + '/../../../../samples/files/stamptest.png');

describe('Annotation', function() {
  it.only('draw each type of annotation successfully', function(client) {
    // width for the annotation drawn by the tool, in pixels
    const annotWidth = 40;
    // height for the annotation drawn by the tool, in pixels
    const annotHeight = 40;
    // array of objects, in the shape of:
    // toolNames: array of tools that share the same draw function
    // draw: a function that takes the starting x, y and draw the annotation on the annotation canvas
    // note that signature tool is not here since the annotation made by it is just a freehand annotation 
    // and we test freehand annotation using the freehand tool
    const toolPainter = [
      {
        toolNames: [
          'AnnotationCreateArrow',
          'AnnotationCreateEllipse',
          'AnnotationCreateFreeHand',
          'AnnotationCreateLine',
          'AnnotationCreateRectangle',
          'AnnotationCreateDistanceMeasurement',
        ],
        draw: function(x, y) {
          client
            .mouseButtonDown('left')
            .moveToElement('.pageContainer', x + annotWidth, y + annotHeight)
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
        draw: function(x, y) {
          client
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + annotWidth, y)
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + annotWidth / 2, y + annotHeight)
            .doubleClick();
        }
      },
      {
        toolNames: ['AnnotationCreateCallout'],
        draw: function(x, y) {
          client
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + annotWidth, y)
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + annotWidth / 2, y + annotHeight / 2)
            .mouseButtonClick()
            // click off the text area to blur it out
            .moveToElement('.pageContainer', 5,  5)
            .doubleClick();
        }
      },
      {
        toolNames: ['AnnotationCreateFreeText'],
        draw: function(x, y) {
          client
            .mouseButtonDown('left')
            .moveToElement('.pageContainer', x + annotWidth, y + annotHeight)
            .mouseButtonUp('left')
            .readerControl('setToolMode', 'AnnotationEdit')
            // click off the text area to blur it out
            .moveToElement('.pageContainer', 5,  5)
            .mouseButtonClick()
        }
      },
      {
        toolNames: ['AnnotationCreateSticky'],
        draw: function(x, y) {
          client
            .mouseButtonClick()
            // in the current UI version, a sticky annotation will be selected
            // and the left panel will open after it is added to the canvas 
            // wait for 1 sec so that the panel will be fully open then close it and deselect the annotation
            .pause(500)
            .readerControl('closeElements', ['leftPanel'])
            .moveToElement('.pageContainer', 5,  5)
            .mouseButtonClick()
        }
      },
      {
        toolNames: ['AnnotationCreateStamp'],
        draw: function(x, y) {
          client
            // if we don't pause then there's a change that the file input can't be found
            .pause(500)
            .mouseButtonClick()
            .setValue('input[type="file"]', stampImage)
        }
      }
    ];

    client
      .readerControl('loadDocument', '/samples/files/sample.pdf')
      .waitForWVEvent('pageComplete')
      // if we don't wait 500ms then mouse actions will be performed on the progressModal(in the UI we close it asynchronously)
      // and we won't be able to see the annotation drawn in the canvas
      .pause(500, function() {
        toolPainter.forEach(function({ toolNames, draw }, rowIndex) {
          const initOffsetX = 5, 
                initOffsetY = 220,
                gap = 20,
                y = initOffsetY + rowIndex * (annotHeight + gap);

          toolNames.forEach(function(toolName, colIndex) {
            const x = initOffsetX + colIndex * (annotWidth + gap);
            

            client
              .readerControl('setToolMode', toolName)
              .moveToElement('.pageContainer', x, y, function() {
                draw(x, y);
              })
          })
        })
      })
      .pause(500000)
  });
});