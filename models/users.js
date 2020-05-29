const mongoose = require('mongoose');
const Schmea = mongoose.Schema;
const findorcreate =require('mongoose-find-or-create');


const UserSchema = new Schmea({
    googleId:{
        type:String,
        unique:true
    },
    name : String,
    surname:String,
    profilPhotoUrl:String
});

UserSchema.plugin(findorcreate);
module.exports = mongoose.model('users',UserSchema);