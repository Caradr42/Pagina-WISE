const mongoose = require('mongoose');
const datosMainSchema = new mongoose.Schema({
    contactos: [{
        tipo: String,
        url: String,
        icono: String,
    }],
    copyright: String
});

module.exports = mongoose.model('main', datosMainSchema, 'datosMain');