const mongoose = require('mongoose');
const datosHomeSchema = new mongoose.Schema({
    slide_imgs: [String],
    title: String,        
    columns: [{
        title: String,
        content: String
    }],
    patrocinadores: [{
        nombre: String,
        img: String
    }],
    patrocinadores_descripcion: String,
    salon_de_la_fama: [{
        nombre: String,
        descripcion: String,
        img: String
    }]
});

module.exports = mongoose.model('home', datosHomeSchema, 'datosHome');