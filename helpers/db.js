const mongoose=require('mongoose');
// mongoose console error for hide 
module.exports=()=>{


    mongoose.connect(process.env.DB_STRING
    ,{
        useNewUrlParser:true
        ,useUnifiedTopology:true
    });

    mongoose.connection.on('open',()=>{
        console.log("Mongo db is start");
    });

    mongoose.connection.on('error',(err)=>{

        console.log("MongoDb is Error:",err);
    });

    mongoose.Promise=global.Promise;

};