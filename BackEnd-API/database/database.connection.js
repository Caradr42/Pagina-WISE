const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//set connection options
const options = {
    useNewUrlParser: true,
    reconnectTries: 60,
    reconnectInterval: 1000,
    poolSize: 10,
    bufferMaxEntries: 0,
    useFindAndModify: false

}


//Conect to database
mongoose.connect(process.env.DB_CONNECT, options)
    .then(db => console.log('Connected to DB'))
    .catch(err => {

        console.log(err)

    });

module.exports = mongoose;