const express = require('express');
const exphs = require('express-handlebars');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

//endpoints
app.use(express.static(path.join(__dirname, 'public')) );
app.get('/', function(req, res){
    //res.send('<h1> Hello world!!!</h1>')
    res.sendFile(path.join(__dirname, 'public', 'index.html') );
});

app.listen(PORT, () => console.log(`Server started on port ${PORT} on dir ${__dirname}`) );