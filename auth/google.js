const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//models 
const User = require('../models/users');

passport.use(
    new GoogleStrategy({
        clientID : process.env.GOOGLE_LOGIN_CLIENT_ID,
        clientSecret : process.env.GOOGLE_LOGIN_SECRET_KEY,
        callbackURL:process.env.GOOGLE_LOGIN_CALLBACK_URL
    },
        ((accessToken,refreshToken,profile,done) =>{
        const data = profile._json;
        console.log(data);
        User.findOrCreate({
            'googleId':data.id
        },{
            name:data.name.givenName,
            surname:data.name.familyName,
            profilPhotoUrl:data.picture
        },(err,user)=>{
            return done(err,user);
        })
   
    })

));

// get session the user serialize
passport.serializeUser((user,done)=>{
    done(null,user);
});

// get session the user deserialize
passport.deserializeUser((user,done)=>{
    done(null,user);
});

module.exports = passport;