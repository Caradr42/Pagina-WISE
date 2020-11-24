const mongoose = require('mongoose');

const datosEventosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imgs: [String],
    markdownContent: String,
    event_link: String,
    event_date: String,
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('eventos', datosEventosSchema, 'datosEventos');