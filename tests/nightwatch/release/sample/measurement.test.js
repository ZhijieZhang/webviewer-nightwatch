describe('Measurement', function () {
  it('create annotations that measurement distance, perimeter and area', function(client) {
    // width for the annotation drawn by the measurement tools, in pixels
    const annotWidth = 40;
    // height for the annotation drawn by the measurement tools, in pixels
    const annotHeight = 40;
    const measurementTools = [
      {
        toolNames: [
          'AnnotationCreateDistanceMeasurement',
        ],
        draw: function (x, y) {
          client
            .mouseButtonDown('left')
            .moveToElement('.pageContainer', x + annotWidth, y + annotHeight)
            .mouseButtonUp('left');
        }
      },
      {
        toolNames: [
          'AnnotationCreatePerimeterMeasurement',
          'AnnotationCreateAreaMeasurement'
        ],
        draw: function (x, y) {
          client
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + annotWidth, y)
            .mouseButtonClick()
            .moveToElement('.pageContainer', x + annotWidth / 2, y + annotHeight)
            .doubleClick();
        }
      }
    ];
    client
      .loadSample('advanced/measurement')
      .waitForWVEvent('pageComplete')
      // notes panel will be sorted by position by default
      // and in the current implementation a note will show the time it's created when sorted by position
      // this will affect the screenshot so we set the strategy to time here
      .readerControl('setSortStrategy', 'time');

    measurementTools.forEach(function ({ toolNames, draw }, rowIndex) {
      const initOffsetX = 5,
            initOffsetY = 5,
            gap = 20,
            y = initOffsetY + rowIndex * (annotHeight + gap);

      toolNames.forEach(function (toolName, colIndex) {
        const x = initOffsetX + colIndex * (annotWidth + gap);

        client
          .readerControl('setToolMode', toolName)
          .moveToElement('.pageContainer', x, y, function () {
            draw(x, y);
          });
      });
    });

    client.assert.screenshot('.App', 'measurement.test.png');
  });
});