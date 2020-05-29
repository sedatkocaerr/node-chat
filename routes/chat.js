const express = require('express');
const router = express.Router();

// Get Chat home page
router.get('/chat',(req,res,next)=>{
    res.render('chat');
});

module.exports = router;