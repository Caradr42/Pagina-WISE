const mongoose = require('mongoose')
const Patrocinador = new mongoose.Schema({
    nombre: String,
    description: String,
    img: String
});

module.exports = mongoose.model('patrocinador', Patrocinador, 'patrocinadores');