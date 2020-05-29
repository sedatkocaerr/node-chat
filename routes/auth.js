const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');

router.get('/google',passportGoogle.authenticate(
    'google',
    {
        //Scope : want to user informations from google ,Profile,email like.
        scope:['profile']
    }
));

router.get('/google/callback',
passportGoogle.authenticate(
    'google',
    {
        //if google response is fail redirect to index.
        failureRedirect:'/'
    }),
    (req,res)=>{
        res.redirect('/chat');
    });

module.exports = router;