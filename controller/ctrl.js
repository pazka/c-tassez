var storage = require('node-persist');
var session = require('cookie-session');

var i_currId = "currId";
var i_pages = "lines";

ctrl = {};

ctrl.addRecord = function(title,nextId,mdp,start,imgname,img2name,txt,txt2){
    storage.initSync();
    var currId = storage.getItemSync(i_currId);
    storage.setItemSync(i_currId,currId+1);
    var allPages = storage.getItemSync(i_pages);

    var page = {
        title:title,
        id : currId,
        nextId:nextId,
        mdp:mdp,
        start:start,
        img:imgname ,
        img2:img2name ,
        txt:txt,
        txt2:txt2
    };

    allPages.push(page);
    storage.setItemSync(i_pages,allPages);

    return page;
}

ctrl.editRecord = function(_id,_title,_nextId,_mdp,_start,_imgname,_img2name,_txt,_txt2){
    storage.initSync();
    var allPages = storage.getItemSync(i_pages);

    for (var i = 0; i < allPages.length; i++) {
        var line = allPages[i];
        if (line.id == _id) {

            allPages[i] = {
                title: _title!=null ? _title : line.title,
                id : _id,
                nextId: _nextId!=null ? _nextId : line.nextId,
                mdp:_mdp!=null  ? _mdp : line.mdp,
                start:_start!=null ? _start : line.start,
                img:_imgname!=null ? _imgname : line.img ,
                img2:_img2name!=null ? _img2name : line.img2 ,
                txt:_txt!=null ? _txt : line.txt ,
                txt2:_txt2!=null ? _txt2 : line.txt2
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
        allPages.splice(index, 1);
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
    var allPages = storage.getItemSync(i_pages);
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

ctrl.setPageSession = function(req,id){
    console.log("I put " +id +"into session");
    req.session.pageId = id;
};

ctrl.getPageSession = function(req){
    return req.session.pageId;
};

ctrl.checkSession = function(req){
    return (req.session && req.session.user == "admin");
};

ctrl.isAccessValid = function(req,mdp){
    //get where user is supposed to go
    var line = ctrl.getRecordById(ctrl.getPageSession(req));
    var lineNext = ctrl.getRecordById(line.nextId);
        console.log("I check session with ID " + line.id +" for mdp : " + lineNext.mdp);

    console.log(ctrl.getCheat());
    //answer
    return ctrl.getCheat() || lineNext.mdp == mdp;
}

module.exports = ctrl;
