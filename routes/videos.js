var express = require('express');
var router = express.Router();
var models = require('../models');
var amqp = require('amqplib/callback_api');

var criteria = function(req) { //callback for id required
  return { where: {id: req.params.id} };
}

function qmconection(video){
  amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'video';
    //console.log(video);
    //var msg = video.url+' '+video.splitpart+' '+video.timepart+' '+video.isvideo+' '+video.id;
    //console.log(msg);
    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer(JSON.stringify(video)));
    console.log(video);
    setTimeout(function() { conn.close();}, 500);
  });
});
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
        qmconection(video);
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