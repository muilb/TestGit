define(function (require) {
  return function VisTypeFactory(Private) {

    /**
     * Provides the visualizations for the vislib
     *
     * @module vislib
     * @submodule VisTypeFactory
     * @param Private {Object} Loads any function as an angular module
     * @return {Function} Returns an Object of Visualization classes
     */
    return {
      // lbmui note modify visualization
      // gán name (chart type) demo_column vào điều khiển vẽ biểu đồ tương ứng. Ở đây, tạm dùng column chart default
      demo_column: Private(require('ui/vislib/visualizations/demo_chart')),
      histogram: Private(require('ui/vislib/visualizations/column_chart')),
      pie: Private(require('ui/vislib/visualizations/pie_chart')),
      line: Private(require('ui/vislib/visualizations/line_chart')),
      area: Private(require('ui/vislib/visualizations/area_chart')),
      tile_map: Private(require('ui/vislib/visualizations/tile_map'))
    };
  };
});
