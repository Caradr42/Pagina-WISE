const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const passport = require('passport');

const { mongoose } = require('../../BackEnd-API/database/database.connection');
const isLoggedIn = require('../../BackEnd-API/server/userVerification');

//====== CONTROLLERS ======
const DatosHomeCtrl = require("../../BackEnd-API/server/controllers/datosHomeCtrl");
const PublicacionesCtrl = require("../../BackEnd-API/server/controllers/datosPublicacionesCtrl");
const EventosCtrl = require("../../BackEnd-API/server/controllers/datosEventosController");
const UsersCtrl = require("../../BackEnd-API/server/controllers/usersCtrl");
const DatosMainCtrl = require("../../BackEnd-API/server/controllers/datosMainController");
//======

//
function cloneToObjArr(doc) {
    var copy = [];

    for(i = 0; i < doc.length; i++){
        if (Array.isArray(doc[i])) {
            copy.push(doc[i]);
        } else if (typeof doc[i] === "object") {
            copy.push(doc[i].toObject());
        }
    }
    return copy;
}


///===== amdin updates

router.post('/admin/updateAdminStatus', isLoggedIn, (req, res) => {
    
    UsersCtrl.updateUser({ OID: req.body.OID }, { isAdmin: req.body.status }).then(err => {
        console.log('admin to update with : ' + req.body.status + " : " + req.body.OID); 
        res.send({do: "reload"});
        //return res.send({msg: 'admin updated', OID: req.body.OID, status: req.body.status});
    });
});

router.post('/admin/updateHome/columns', isLoggedIn, (req, res) => {
    //console.log('received columns : ' + JSON.stringify(req.body));

    cols = [];
    size = Math.max(req.body.title.length, req.body.content.length);    
    for (i = 0; i < size; ++i){
        cols.push(
            {
                title: req.body.title[i],
                content: req.body.content[i]
            }
        );
    }
    
    DatosHomeCtrl.update({title: req.body.mainTitle, columns: cols});

    //return res.send(JSON.stringify(req.body));
    //res.send({do: "reload"});
    res.redirect('/admin/super-secret-page#home');
});

router.post('/admin/updateHome/create-col', isLoggedIn, (req, res) => {
   // console.log(JSON.stringify(req.body));  
    DatosHomeCtrl.insert_column(req.body);
    res.send({do: "reload"});
});

router.post('/admin/updateHome/remove-col', isLoggedIn, (req, res) => {
    //console.log(JSON.stringify(req.body));  
    DatosHomeCtrl.remove_column_by_index(req.body.index);

    //DatosHomeCtrl.remove_column(req.body);
    res.send({do: "reload"});
 });



 
///===== amdin routes

router.get('/failed', (req, res) => {
    res.send("No eres un administrador; tu solicitud sera revisada");
});

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/admin');
});

router.get('/admin/super-secret-page', isLoggedIn, (req, res) => {   
    let obj = null;
    if (req.user) obj = req.user.toObject();

    UsersCtrl.findAll().then(usrs => {
        const objs = cloneToObjArr(usrs);

        DatosHomeCtrl.get().then(home => {
            res.render('pagina-secreta', 
            {
                user: obj, 
                users: objs, 
                homeData: home[0].toObject(), 
                layout: false
            });
        });
    });
});

router.get('/admin', (req, res, next) => {
    let obj = null;
    if (req.user) obj = req.user.toObject();
    if (req.user) res.redirect('/admin/super-secret-page');
    
    res.render('admin', {user: obj});
});




//routes =============================================
router.get('/', (req, res, next) => {

    DatosHomeCtrl.get().then(doc => {
        res.render('home', {homeData: doc[0].toObject()});
    });
});

router.get('/publicaciones', (req, res, next) => {

    PublicacionesCtrl.getAll().then(doc => {
        const objs = cloneToObjArr(doc);
        res.render('publicaciones', {publicacionesData: objs});
    });
});

router.get('/eventos', (req, res, next) => {
    EventosCtrl.getAll().then(doc => {
        const objs = cloneToObjArr(doc);
        res.render('eventos', {eventosData: objs});
    });
});

router.get('/oportunidades', (req, res, next) => {
    res.render('oportunidades');
});

router.get('/recomendaciones', (req, res, next) => {
    res.render('recomendaciones');
});

module.exports = router;