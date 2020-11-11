const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
//const hbs = require('hbs')
const port = process.env.PORT || 5000;
const { mongoose } = require('../../BackEnd-API/database/database.connection');

//======
const DatosHomeCtrl = require("../../BackEnd-API/server/controllers/datosHomeCtrl");
const SalonDeLaFamaCtrl = require("../../BackEnd-API/server/controllers/salon_de_la_famaCtrl");
const PublicacionesCtrl = require("../../BackEnd-API/server/controllers/datosPublicacionesCtrl");
const PatrocionadoresCtrl = require("../../BackEnd-API/server/controllers/patrocinadoresCtrl");
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

//routes
router.get('/', (req, res, next) => {
    res.render('home');

});

router.get('/admin', (req, res, next) => {
    res.render('admin');
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