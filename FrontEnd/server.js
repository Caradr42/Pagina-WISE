const path = require('path');
const PORT = process.env.PORT || 3000;

const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('./passport-setup');
const app = express();

//===== view engine setup ===== 
var layoutsPath = path.join(__dirname, path.join('views', 'layouts'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: layoutsPath}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//===== handlebars function example =====
// var hbsC = hbs.create({});
// hbsC.handlebars.registerHelper('setColor', function (index) {
//     if (parseInt(index) % 2 === 0){
//         return '#eee';
//     }
//     return '#aaa';
// });

/// ===== Middlewares =====
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
    name: 'admin-session',
    keys: ['key1', 'key2'] 
}));

app.use(passport.initialize());
app.use(passport.session());

///===== OAuth passport request authentication ======
app.get('/google',  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }
    ),
    function(req, res) {
        // Successful authentication, redirect to super-secret-page.
        res.redirect('/admin/super-secret-page');
    }
);


//routing
app.use('/', require('./routes/index'));


app.listen(PORT, () => console.log(`\nServer started on port ${PORT} on dir ${__dirname}`) );