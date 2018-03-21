var express = require('express');
var session = require('cookie-session');
var ctrl = require('../controller/ctrl');
var router = express.Router();


router.get('/log',function(req,res,next){
    res.render('login.twig');
});
router.post('/log',function(req,res,next){
    if(req.body.psw == "test"){
        ctrl.createSession(req);
        res.redirect('/admin/home');
        return;
    }

    res.render('login.twig',{message:"Mauvais mot de passe"});
});

router.use('/home',function(req,res,next){
    if(!ctrl.checkSession(req)){
        res.redirect('/admin/log');
    }else
        next();
});

/* GET users listing. */
router.get('/home', function(req, res, next) {
    res.render('admin.html.twig',{allLines : ctrl.getAllrecord()});
});

router.post('/home/add', function(req, res, next) {
        var serverPath = "./public/img/";
        var clientPath = "./img/";
        var baseExt = ".jpg";

        //if id then update
        console.log(req.body);
        console.log(req.files);

        if(req.body.id){
            ctrl.editRecord(req.body.title,req.body.idnext,req.body.idorig,req.body.mdp, null,req.body.txt);

            if(req.files.img != null){
                req.files.img.mv(serverPath + req.body.id + baseExt);
                ctrl.editRecord(req.body.title,req.body.idnext,req.body.idorig,req.body.mdp,req.files.img.name,req.body.txt);
            }
            res.redirect('/admin/home');
            return;
        }
        //else jsute create
        var line = ctrl.addRecord(req.body.title,req.body.idnext,req.body.idorig,req.body.mdp, req.files.img.name,req.body.txt);
        req.files.img.mv(serverPath + line.id + baseExt);

        res.redirect('/admin/home');
});

router.post('/home/remove', function(req, res, next) {
        //if id then update
    ctrl.deleteRecord(req.body.id);

    res.send('ok');
});

router.post('/home/cheat', function(req, res, next) {
    ctrl.toggleCheat();
    res.send('OK');
});

module.exports = router;
