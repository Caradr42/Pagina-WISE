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
const AdminsCtrl = require("../../BackEnd-API/server/controllers/adminsCtrl");
//======

function cloneToObjArr(doc) {
    var copy = [];
    doc.forEach(e => {
        if (Array.isArray(e)) {
            copy.push(e);
        } else if (typeof e === "object") {
            copy.push(e.toObject());
        }
    });
    return copy;
}

// router.get('/cv', (req, res, next) => {
//     cvData.find() 
//         .then(function (doc) {
//             var copy = cloneToObjArr(doc);
//             res.render('cv', {cvFields: copy});
//         });
// });

router.get('/failed', (req, res) => {
    res.send("No eres un administrador; tu solicitud sera revisada");
});

router.get('/admin/super-secret-page', isLoggedIn, (req, res) => {   
    let obj = null;
    if (req.user) obj = req.user.toObject();
    res.render('pagina-secreta', {user: obj, layout: false});
});

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/admin');
});

//routes
router.get('/', (req, res, next) => {
    res.render('home');

});

router.get('/admin', (req, res, next) => {
    let obj = null;
    if (req.user) obj = req.user.toObject();
    if (req.user) res.redirect('/admin/super-secret-page');
    res.render('admin', {user: obj});
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