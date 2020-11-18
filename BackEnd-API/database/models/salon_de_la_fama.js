const mongoose = require('mongoose')
const SalonDeLaFama = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    img: String
});

module.exports = mongoose.model('salonDeLaFama', SalonDeLaFama, 'salonDeLaFama');