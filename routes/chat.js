const express = require('express');
const router = express.Router();

// Get Chat home page
router.get('/',(req,res,next)=>{
    console.log(req.user);
    res.render('chat');
});

module.exports = router;