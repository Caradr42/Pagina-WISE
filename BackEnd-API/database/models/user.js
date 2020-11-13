const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: String,
    OID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    img: String,
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
});

module.exports = mongoose.model('user', user, 'users');