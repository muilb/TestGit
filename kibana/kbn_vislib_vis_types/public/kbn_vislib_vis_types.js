define(function (require) {
  var visTypes = require('ui/registry/vis_types');
  visTypes.register(require('plugins/kbn_vislib_vis_types/histogram'));
  visTypes.register(require('plugins/kbn_vislib_vis_types/line'));
  visTypes.register(require('plugins/kbn_vislib_vis_types/pie'));
  visTypes.register(require('plugins/kbn_vislib_vis_types/area'));
  visTypes.register(require('plugins/kbn_vislib_vis_types/tileMap'));
  // lbmui note modify visualization
  // Chèn thêm tùy chọn tạo visualization - loại demoColumn
  visTypes.register(require('plugins/kbn_vislib_vis_types/demoColumn'));
});
