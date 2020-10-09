const express = require('express');
const app = express();
const authentication = require('./routes/User.Routes');
const axios = require('axios');
const verify = require('./VerifyTokens/verifyWebToken');
const registerTrip = require('./routes/Trip.Routes')
const purchaseAuth = require('./routes/Purchase.Routes');

//set database connection 
const { mongoose } = require('../database/database.connection');

//Port in which is running
const port = process.env.PORT || 3000;


//Middleware
app.use(express.json());



// Show in console that is running
app.listen(port, () => {
    console.log(`Running on port  ${port}`)
});