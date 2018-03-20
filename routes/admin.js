var express = require('express');
var ctrl = require('../controller/ctrl');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    ctrl.addRecord("test",1,0,"non");
    res.render('admin.twig',{allLines : ctrl.getAllrecord()});
});

module.exports = router;
