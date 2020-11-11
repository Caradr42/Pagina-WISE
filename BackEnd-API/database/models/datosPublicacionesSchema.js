const mongoose = require('mongoose')

const datosPublicacionesSchema = new mongoose.Schema({
    title: String,
    markdownContent: String,
    imgs: [String]
}, { collection: "datosPublicaciones" });


module.exports = mongoose.model('datosPublicacionesSchema', datosPublicacionesSchema)