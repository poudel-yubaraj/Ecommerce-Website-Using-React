const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    passowrd:{
        type:String,
    },
    cartData:{
       type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});
module.exports=mongoose.model('userModel',userSchema);