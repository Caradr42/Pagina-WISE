const mongoose = require('mongoose')

const datosPublicacionesSchema = new mongoose.Schema({
    title: String,
    markdownContent: String,
    imgs: [String]
});

module.exports = mongoose.model('publicaciones', datosPublicacionesSchema, 'datosPublicaciones');