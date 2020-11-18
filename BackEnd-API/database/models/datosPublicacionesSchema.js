const mongoose = require('mongoose');

const datosPublicacionesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    markdownContent: String,
    imgs: [String],
    date: String
});

module.exports = mongoose.model('publicaciones', datosPublicacionesSchema, 'datosPublicaciones');