const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/test');

// function cloneToObjArr(doc){
//     var copy = [];
//     doc.forEach(e => { 
//         if(Array.isArray(e)){
//             copy.push(e);
//         }else if (typeof e === "object"){
//             copy.push(e.toObject());
//         }
//     });
//     return copy;
// }

// var Schema = mongoose.Schema;

// var cvDataSchema = new Schema({
//     title: {type: String, required: true},
//     content: [String]
// },{collection: "cvFields"});

// var cvData = mongoose.model('cvFields', cvDataSchema);

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