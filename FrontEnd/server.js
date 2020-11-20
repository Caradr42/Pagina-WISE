const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const favicon = require('serve-favicon')
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const md = require('./markdown_setup');

require('./passport-setup');
const app = express();

//===== view engine setup ===== 
var layoutsPath = path.join(__dirname, path.join('views', 'layouts'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: layoutsPath}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//===== handlebars helper functions =====
var hbsC = hbs.create({});
hbsC.handlebars.registerHelper('areNotEqual', function (a, b) {
    if (a === b) return false;
    return true;
});
hbsC.handlebars.registerHelper('isActiveSlide', function (index) {
    if (index === 0) return 'active';
    return '';
});
hbsC.handlebars.registerHelper('markdownize', function (content) {
    return md.render(content);
});

/// ===== Middlewares =====
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev')); 
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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