var express = require('express');
var ctrl = require('../controller/ctrl');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var id = req.query.id ? req.query.id  : 0;

    var line = ctrl.getRecordById(id);

    //not starting page
    if( !line || line.id != 0 ){
        return res.render("wrong.twig");
    }

    //starting page
    ctrl.setPageSession(req,id);
    if(line.start == 'true')
        res.render("disp_silence.twig",{line:line,maxId:ctrl.getLastId()});
    else
        res.render("disp.twig",{line:line,maxId:ctrl.getLastId()});
});


router.post('/', function(req, res, next) {

    if(!ctrl.isAccessValid(req,req.body.mdp)){
        return res.render("wrong.twig");
    }

    var line = ctrl.getRecordById(ctrl.getPageSession(req));
    var lineNext = ctrl.getRecordById(line.nextId);

    ctrl.setPageSession(req,lineNext.id);
if(lineNext.start == 'true')
        res.render("disp_silence.twig",{line:lineNext,maxId:ctrl.getLastId()});
    else
        res.render("disp.twig",{line:lineNext,maxId:ctrl.getLastId()});
});

router.post('/check', function(req, res, next) {
    //answer
    if(!ctrl.isAccessValid(req,req.body.mdp)){
        return res.send('KO');
    }

    res.send('OK');
});

module.exports = router;
