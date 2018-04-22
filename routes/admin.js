var express = require('express');
var session = require('cookie-session');
var ctrl = require('../controller/ctrl');
var router = express.Router();


router.get('/',function(req,res,next){
    res.redirect('/admin/home');
});

router.get('/log',function(req,res,next){
    res.render('login.twig');
});
router.post('/log',function(req,res,next){
    //TODO ENV PASSWORD
    if(req.body.psw == "cetassez2018"){
        ctrl.createSession(req);
        res.redirect('/admin/home');
        return;
    }

    res.render('login.twig',{message:"Mauvais mot de passe"});
});

router.use('/home',function(req,res,next){
    if(!ctrl.checkSession(req)){
        res.redirect('/admin/log');
    }else{
        next();
    }
});

/* GET users listing. */
router.get('/home', function(req, res, next) {
    res.render('admin.html.twig',{allLines : ctrl.getAllrecord(),cheat:ctrl.getCheat()});
});

router.post('/home/add', function(req, res, next) {
    var serverPath = "./public/img/";
    var clientPath = "./img/";
    var baseExt = ".jpg";

    //else jsute create
    var line = ctrl.addRecord(req.body.title,req.body.idnext,req.body.mdp,req.body.start,null, null,req.body.txt,req.body.txt2);


    if(req.files){
        if(req.files.img){
            ctrl.editRecord(line.id,null,null,null,null,req.files.img.name,null,null,null);
            req.files.img.mv(serverPath + line.id + baseExt);
        }

        if(req.files.img2){
            ctrl.editRecord(line.id,null,null,null,null,null,req.files.img2.name,null,null);
            req.files.img2.mv(serverPath + line.id+"_sec" + baseExt);
        }
    }
    res.redirect('/admin/home');
});

router.post('/home/edit', function(req, res, next) {
    var serverPath = "./public/img/";
    var clientPath = "./img/";
    var baseExt = ".jpg";

    ctrl.editRecord(req.body.id,req.body.title,req.body.idnext,req.body.mdp,req.body.start, null,null,req.body.txt,req.body.txt2);

    if(req.files.img){
        req.files.img.mv(serverPath + req.body.id + baseExt);
        ctrl.editRecord(req.body.id,null,null,null,null,req.files.img.name,null,null,null);
    }
    if(req.files.img2){
        req.files.img2.mv(serverPath + req.body.id +"_sec"+ baseExt);
        ctrl.editRecord(req.body.id,null,null,null,null,null,req.files.img2.name,null,null);
    }
    res.redirect('/admin/home');
});

router.post('/home/remove', function(req, res, next) {
    //if id then update
    ctrl.deleteRecord(req.body.id);

    res.send('ok');
});

router.post('/home/reset', function(req, res, next) {
    //if id then update
    ctrl.resetRecord();

    res.send('ok');
});

router.post('/home/cheat', function(req, res, next) {
    ctrl.toggleCheat();
    res.send('OK');
});

module.exports = router;
