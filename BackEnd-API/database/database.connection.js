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

mongoose.Promise = global.Promise;
//Conect to database

mongoose.connect(process.env.DB_CONNECT, options)
    .then(db => {
        console.log('\nConnected to DB: ' + mongoose.connection.host + ":" + mongoose.connection.port);
        console.log("\tname: " + mongoose.connection.name);
        console.log('\tWith collections: ');
        for (e in mongoose.connection.collections){
            console.log('\t\t' + e);
        }
        
    })
    .catch(err => {
        console.log(err);
    });

module.exports = mongoose;