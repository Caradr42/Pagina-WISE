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
    }
});

module.exports = mongoose.model('user', user, 'users');