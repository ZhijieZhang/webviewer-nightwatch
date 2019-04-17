'AnnotationCreateFreeText'


'AnnotationCreateSignature'
'AnnotationCreateStamp'
'AnnotationCreateSticky'
'AnnotationCreateTextHighlight'
'AnnotationCreateTextSquiggly'
'AnnotationCreateTextStrikeout'
'AnnotationCreateTextUnderline'
'AnnotationCreateRedaction'

describe('Annotation', function() {
  it.only('draw each type of annotation successfully', function(client) {
    // Width for the annotation drawn by the tool, in pixels
    const annotWidth = 40;
    // Height for the annotation drawn by the tool, in pixels
    const annotHeight = 40;
    // Array of objects, in the shape of:
    // toolNames: array of tools that share the same draw function
    // draw: a function that takes the starting x, y and draw the annotation on the annotation canvas
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
            .moveToElement('.pageContainer', x + annotWidth + 50,  y + annotHeight + 50 )
            .doubleClick();
        }
      },
      {
        
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
                initOffsetY = 300,
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