const mongoose = require('mongoose');
const datosHomeSchema = new mongoose.Schema({
    slide_imgs: [String],
    title: String,        
    columns: [{
        title: String,
        content: String
    }],
    contactos: [{
        tipo: String,
        url: String,
        icono: String,
    }],
    copyright: String
});

module.exports = mongoose.model('home', datosHomeSchema, 'datosHome');