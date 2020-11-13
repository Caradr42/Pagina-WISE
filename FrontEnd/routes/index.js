const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const { mongoose } = require('../../BackEnd-API/database/database.connection');
const isLoggedIn = require('../../BackEnd-API/server/userVerification');

//====== CONTROLLERS ======
const DatosHomeCtrl = require("../../BackEnd-API/server/controllers/datosHomeCtrl");
const SalonDeLaFamaCtrl = require("../../BackEnd-API/server/controllers/salon_de_la_famaCtrl");
const PublicacionesCtrl = require("../../BackEnd-API/server/controllers/datosPublicacionesCtrl");
const PatrocionadoresCtrl = require("../../BackEnd-API/server/controllers/patrocinadoresCtrl");
const UsersCtrl = require("../../BackEnd-API/server/controllers/usersCtrl");
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
        return res.send({msg: 'admin updated', OID: req.body.OID, status: req.body.status});
    });
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

    const allUsers = UsersCtrl.findAll().then(usrs => {
        //console.log("All users: " + usrs);
        
        const objs = cloneToObjArr(usrs);

        res.render('pagina-secreta', {user: obj, users: objs, layout: false});
    });
});

router.get('/admin', (req, res, next) => {
    let obj = null;
    if (req.user) obj = req.user.toObject();
    if (req.user) res.redirect('/admin/super-secret-page');
    
    res.render('admin', {user: obj});
});

//routes
router.get('/', (req, res, next) => {
    res.render('home');

});

router.get('/eventos', (req, res, next) => {
    res.render('eventos');
});

router.get('/oportunidades', (req, res, next) => {
    res.render('oportunidades');
});

router.get('/publicaciones', (req, res, next) => {
    res.render('publicaciones');
});

router.get('/recomendaciones', (req, res, next) => {
    res.render('recomendaciones');
});

module.exports = router;