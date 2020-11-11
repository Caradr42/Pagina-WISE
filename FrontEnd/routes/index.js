const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/WISE_ITESM');

function cloneToObjArr(doc){
    var copy = [];
    doc.forEach(e => { 
        if(Array.isArray(e)){
            copy.push(e);
        }else if (typeof e === "object"){
            copy.push(e.toObject());
        }
    });
    return copy;
}

var Schema = mongoose.Schema;

var datosHomeSchema = new Schema({
    infoGeneral: {
        title: String,
        top_content: [String],
        slide_imgs: [String],
        columns: [{
            title: String,
            content: String
        }]
    },
    patrocinadores: [{
        nombre: String,
        descripción: [String],
        img: String
    }],
    salonDeLaFama:[{
        nombre: String,
        descripción: [String],
        img: String
    }],
    contacto: [{
        tipo: String,
        url: String,
        icono: String
    }]
},{collection: "datosHome"});

var datosPublicacionesSchema = new Schema({
    title: String,
    markdownContent: [String],
    imgs: [String]
},{collection: "datosPublicaciones"});

var datosHome = mongoose.model('datosHome', datosHomeSchema);
var datosPublicaciones = mongoose.model('datosPublicaciones', datosPublicacionesSchema);

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