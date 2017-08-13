var express = require('express');
var router = express.Router();
var models = require('../models');

var criteria = function(req) { //callback for id required
  return { where: {id: req.params.id} };
}

router.get('/', function(req, res, next) {
  res.format({
    json: function () {
      models.videos.findAll().then(videos => {
        res.json({videos: videos});
      });
    }
  });
});

router.post('/', function(req, res, next) {
  var video = models.videos.create(req.body);
  //console.log(video);
  res.format({
    json: function () {
      video.then(video => {
        res.json(video);
      });
    }//,
    // html: function () {
    //   video.then(video => {
    //       res.redirect('/videos');
    //     }); 
    // }
  })
});


router.put('/:id', function(req, res, next) {
  res.format({
    json: function () {
      models.videos.update(req.body, criteria(req)).then(video => {
        res.json(video);
      });
    }
    
  });
});


router.delete('/', function(req, res, next) {
  res.format({
    json: function() {
      models.videos.clear(criteria(req)).then(() => {
        res.json({status: 'ok'});
      });
    }
  });
});

module.exports = router;