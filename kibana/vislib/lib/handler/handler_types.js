define(function (require) {
  return function HandlerTypeFactory(Private) {
    var pointSeries = Private(require('ui/vislib/lib/handler/types/point_series'));

    /**
     * Handles the building of each visualization
     *
     * @return {Function} Returns an Object of Handler types
     */
    return {
      // lbmui note modify visualization
      // thêm handler type cho chart type demo_column
      demo_column: pointSeries.column,
      histogram: pointSeries.column,
      line: pointSeries.line,
      pie: Private(require('ui/vislib/lib/handler/types/pie')),
      area: pointSeries.area,
      tile_map: Private(require('ui/vislib/lib/handler/types/tile_map'))
    };
  };
});
