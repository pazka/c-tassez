var express = require('express');
var db = require('../persist/silence');
var router = express.Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


/* GET home page. */
router.get('/soundId', function(req, res, next) {
  res.sendfile('index.html');
});

router.get('/soundByLoc', function(req, res, next) {

  db.findAll({where:{
      lon : {$between : [req.query.lon - req.query.radius, req.query.lon + req.query.radius]},
      lat : {$between : [req.query.lat - req.query.radius, req.query.lat + req.query.radius]}
  }}).then((allSounds)=>{
      res.send(allSounds);
  }).catch((err)=>{
      res.render("error.twig",{message:"There was an error.",error:err});
  })
})


var publicPath = "./audio/";
var serverPath = "./public/audio/";
var baseExt = ".mp3";
router.post('/newSound',(req,res,next) =>{
    if(!req.body.name || !req.body.adr || !req.body.lon || !req.body.lat || !req.files){
        return res.status(400).send('not all param present : '
	+ req.body.name
	+ req.body.adr
	+ req.body.lon
	+ req.body.lat
	+ req.files)
    }
	console.log(req.files);
    db.findAll({where:{file:serverPath + req.files.sound.name + baseExt}})
    .then((alreadyExist)=>{
        if(alreadyExist.length != 0)
            return res.status(400).send('File with that name already exists.');

        //creating file
        if (!req.files){
            return res.status(400).send('No files were uploaded.');
        }
        var fileUp = req.files.sound;
        fileUp.mv(serverPath + req.files.sound.name + baseExt).then(()=>
        {
            db.create({
                file: publicPath + req.files.sound.name + baseExt,
                name: req.body.name || "Anonymous",
                adr : req.body.adr,
                lon: req.body.lon,
                lat: req.body.lat,
                createdAt: new Date()
            }).then((ret)=>{
                res.redirect('/uploadDone.html');
            }).catch((err)=>{
                console.log(err);
                res.send(err);
            });
        }).catch((err)=>{
            console.log(err);
            res.send(err);
        });
    });
});

module.exports = router;
