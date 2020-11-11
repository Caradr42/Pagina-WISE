const mongoose = require('mongoose')
const SalonDeLaFama = new mongoose.Schema({
    nombre: String,
    descripción: String,
    img: String

})

module.exports = mongoose.model('SalonDeLaFama', SalonDeLaFama)