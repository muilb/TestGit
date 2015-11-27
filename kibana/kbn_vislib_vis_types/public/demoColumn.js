// lbmui note modify visualization
// Tạo mới file demoColumn.js
// Khởi tạo tham số đầu vào cơ bản cho loại biểu đồ
// Ở đây, tạm sử dụng biểu đồ dạng cột mặc định
define(function (require) {
  return function HistogramVisType(Private) {
    var VislibVisType = Private(require('ui/vislib_vis_type/VislibVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    // lbmui thuộc tính name tương đương chartType, nếu đặt tên khác cần khai báo ở layout_type.js
    return new VislibVisType({
      name: 'demo_column',
      title: 'Demo column chart',
      icon: 'fa-bar-chart',
      description: 'Demo new visualization with column chart',
      params: {
        defaults: {
          shareYAxis: true,
          addTooltip: true,
          addLegend: true,
          scale: 'linear',
          mode: 'stacked',
          times: [],
          addTimeMarker: false,
          defaultYExtents: false,
          setYExtents: false,
          yAxis: {}
        },
        scales: ['linear', 'log', 'square root'],
        modes: ['stacked', 'percentage', 'grouped'],
        editor: require('plugins/kbn_vislib_vis_types/editors/histogram.html')
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Y-Axis',
          min: 1,
          aggFilter: '!std_dev',
          defaults: [
            { schema: 'metric', type: 'count' }
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'X-Axis',
          min: 0,
          max: 1,
          aggFilter: '!geohash_grid'
        },
        {
          group: 'buckets',
          name: 'group',
          title: 'Split Bars',
          min: 0,
          max: 1,
          aggFilter: '!geohash_grid'
        },
        {
          group: 'buckets',
          name: 'split',
          title: 'Split Chart',
          min: 0,
          max: 1,
          aggFilter: '!geohash_grid'
        }
      ])
    });
  };
});
