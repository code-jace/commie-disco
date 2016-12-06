var Video = require('../models/videos');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/videosdb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});

router.findAll = function(req, res) {
    // Use the Video model to find all Videos
    Video.find(function(err, videos) {
        if (err)
            res.send(err);
        else
            res.json(videos);
    });
}

router.findOne = function(req, res) {

    // Use the Video model to find a single Videos
    Video.find({ "_id" : req.params.id },function(err, video) {
        if (err)
            res.json({ message: 'Video NOT Found!', errmsg : err } );
        else
            res.json(video);
    });
}

router.addVideo = function(req, res) {

    var video = new Video();
    video.id = req.body.id;
    video.vidId = req.body.vidId;
    video.vidName = req.body.vidName;
    video.user = req.body.user;
    video.veto = 0;

    console.log('Adding Video: ' + JSON.stringify(video));

    // Save the video and check for errors
    video.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Video Added!', data: video});
    });

}

//This was added to edit the video

    router.editVideo = function (req, res) {

        Video.findById(req.body.id, function (err, video) {

            video.vidName = req.body.vidName;
            video.user = req.body.user;
            video.veto = 0;

            console.log('Editing Video: ' + JSON.stringify(video));

            // Save the video and check for errors
            video.save();
        })

    };

    router.deleteVideo = function (req, res) {

        Video.findByIdAndRemove(req.params.id, function (err) {
            if (err)
                res.send(err);
            else
                res.json({message: 'Video Deleted!', data: Video});
        });
    }

router.incrementVeto = function(req, res) {

    Video.findById(req.params.id, function(err,video) {
        if (err)
            res.send(err);
        else {
            video.veto += 1;
            video.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Video Veto incremented!', data: video });
            });
        }
    });


}

router.resetVeto = function(req, res) {

    Video.findById(req.params.id, function (err, video) {
        if (err)
            res.send(err);
        else {
            video.veto = 0;
            video.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({message: 'Video Veto Reset!', data: video});
            });
        }
    })

}


module.exports = router;