const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UsersCtrl = require("../BackEnd-API/server/controllers/usersCtrl");

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
  
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
// });

passport.serializeUser(function(user, done) {
    // console.log('serializing: ' + user.OID);
    // done(null, user.OID);
    console.log('serializing: ' + user.OID);
    
    done(null, user.OID);
});
  
passport.deserializeUser(function(OID, done) {
    console.log('De-serializing: ' + OID);

    UsersCtrl.findByOID(OID).then(user => {
        console.log('Found user by OID: '  + user.name);
        done(null, user);
    });
    //console.log('De-serializing: ' + OID);
    
    //done(null, OID);
});

passport.use(new GoogleStrategy({
        clientID: "277915498003-ed49jf068rr8o17n8eoiiqo1k9lh72nm.apps.googleusercontent.com",
        clientSecret: "8yTnxHzIXQUI5p5qNgU6quQL",
        callbackURL: "http://localhost:3000/google/callback"
    }, 
    function(accessToken, refreshToken, profile, done) {

        //use the profile info (profile ID) to check if user is already registered in DB else create one
        const usr = UsersCtrl.findOrCreate(profile.displayName, profile.id, profile.emails[0].value).then(
            usr => {
                if(usr){
                    console.log("user retrieved: " + usr.name + " : " + usr.OID);
                }

                return done(null, usr);
            } 
        );

        console.log(profile.emails[0].value + " tried to log in.");
        //console.log(profile);

        // if(usr){
        //     console.log("user retrieved: " + usr.name + " : " + usr.id);
        // }
        
        //return done(null, profile);
  }
));