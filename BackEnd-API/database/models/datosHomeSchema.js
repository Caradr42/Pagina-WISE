const mongoose = require('mongoose')
const datosHomeSchema = new mongoose.Schema({
    infoGeneral: {
        title: String,
        top_content: [String],
        slide_imgs: [String],
        columns: [{
            title: String,
            content: String
        }]
    },
    contacto: [{
        tipo: String,
        url: String,
        icono: String
    }]
}, { collection: "datosHome" });

module.exports = mongoose.model('datosHomeSchema', datosHomeSchema)