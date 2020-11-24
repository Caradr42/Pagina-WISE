const mongoose = require('mongoose');

const datosPublicacionesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imgs: [String],
    markdownContent: String,
    link: String,
    linkText: String,
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('publicaciones', datosPublicacionesSchema, 'datosPublicaciones');