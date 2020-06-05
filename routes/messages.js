const express = require('express');
const router = express.Router();

//libs 

const Messages = require('../src/lib/Messages');

// Get Chat home page
router.get('/list',(req,res,next)=>{
    
    Messages.list(req.query.roomId,messagelist =>{
        res.json(messagelist);
    });
});

module.exports = router;