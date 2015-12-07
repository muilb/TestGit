var elasticsearch = require('elasticsearch');
var express = require('express');

var router = express.Router();
var elsClient = new elasticsearch.Client({
  host: 'http://104.155.233.61:8201',
  log: 'trace'
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api index');
});

router.get('/api1', function(req, res, next) {
  res.json({"a" : "a1"});
});

/* GET all JUNCTION to add Marker */
router.get('/all_junction', function(req, res, next) {
  elsClient.search({
    index: 'pelias',
    type: 'junction',
    body: {
      from: 0,
      size: 5,
      query: {
        match_all: {}
      }
    }
  }, function(err, respond) {
    res.json(respond);
  });
});

router.post('/search', function(req, res, next) {
  var name = req.body.name;
  console.log(req.body);
  var result;
  elsClient.search({
    index: 'pelias',
    type: 'osmaddress',
    body: {
      from: 0,
      size: 5,
      query: {
        match: {
          "name.default": name
        }
      }
    }
  }, function(err, respond) {
    res.json(respond.hits);
  });

//  res.json(result);
});

module.exports = router;
