var storage = require('node-persist');
var session = require('cookie-session');

var i_currId = "currId";
var i_pages = "lines";

ctrl = {};

ctrl.addRecord = function(title,nextId,prevId,mdp,imgname,txt){
    storage.initSync();
    var currId = storage.getItemSync(i_currId);
    storage.setItemSync(i_currId,currId+1);
    var allPages = storage.getItemSync(i_pages);

    var page = {
        title:title,
        id : currId,
        nextId:nextId,
        prevId : prevId,
        mdp:mdp,
        img:imgname ,
        txt:txt
    };

    allPages.push(page);
    storage.setItemSync(i_pages,allPages);

    return page;
}

ctrl.editRecord = function(id,title,nextId,prevId,mdp,imgname,txt){
    storage.initSync();
    var allPages = storage.getItemSync(i_pages);

    for (var line in allPages) {
        if (line.id == id) {
            allPages[indexOf(line)] = {
                title: title ? title : line.title,
                id : line.id,
                nextId: nextId ? nextId : line.nextId,
                prevId : prevId ? prevId : line.prevId,
                mdp:mdp ? mdp : line.mdp,
                img:imgname ? imgname : line.imgname ,
                txt:txt ? txt : line.txt
            }
        }
    }

    storage.setItemSync(i_pages,allPages);
}

ctrl.deleteRecord = function(id){
    storage.initSync();
    var allPages = storage.getItemSync(i_pages);

    var index = -1;
    for (var i = 0; i < allPages.length; i++) {
        if (allPages[i].id == id)
            index = i;
    }

    if (index > -1) {
        array.splice(index, 1);
    }

    storage.setItemSync(i_pages,allPages);
}

ctrl.getAllrecord = function(){
    storage.initSync();
    return storage.getItemSync(i_pages);
}

ctrl.resetRecord = function(){
    storage.initSync();
    storage.setItemSync(i_currId,0);

    storage.setItemSync(i_pages,[]);
}

ctrl.getRecordById = function(id){
    storage.initSync();
    for (var i = 0; i < allPages.length; i++) {
        if (allPages[i].id == id)
            return allPages[i];
    }
    return null;
}

ctrl.toggleCheat = function(){
    storage.initSync();
    storage.setItemSync("cheat",storage.getItemSync("cheat") ? false : true);
}

ctrl.getCheat = function(){
    storage.initSync();
    return storage.getItemSync("cheat");
}

ctrl.createSession = function(req){
    req.session.user = "admin";
};

ctrl.checkSession = function(req){
    return (req.session && req.session.user == "admin");
};


module.exports = ctrl;
