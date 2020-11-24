const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UsersCtrl = require("./BackEnd-API/server/controllers/usersCtrl");

passport.serializeUser(function(user, done) {    
    done(null, user.OID);
});
  
passport.deserializeUser(function(OID, done) {
    //console.log('De-serializing: ' + OID);

    UsersCtrl.findByOID(OID).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: "277915498003-ed49jf068rr8o17n8eoiiqo1k9lh72nm.apps.googleusercontent.com",
        clientSecret: "8yTnxHzIXQUI5p5qNgU6quQL",
        callbackURL: "http://localhost:3000/google/callback"
    }, 
    function(accessToken, refreshToken, profile, done) {

        console.log(profile.emails[0].value + " tried to log in.");

        //use the profile info (profile ID) to check if user is already registered in DB else create one
        const usr = UsersCtrl.findOrCreate(profile.displayName, profile.id, profile.emails[0].value, profile.photos[0].value).then(
            usr => {
                if(usr){
                    console.log("user retrieved: " + usr.name + " : " + usr.OID);
                }

                return done(null, usr);
            } 
        );
  }
));