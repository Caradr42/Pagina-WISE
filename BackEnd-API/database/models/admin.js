const mongoose = require('mongoose')

const admin = new mongoose.Schema({
    OID: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('admin', admin, 'admins');