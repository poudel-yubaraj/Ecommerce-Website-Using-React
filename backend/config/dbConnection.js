const mongoose = require('mongoose');

const dbConnect = async()=>{
    try{
           const connect = await mongoose.connect(process.env.CONNECTION_STRING);
           console.log("Database Connected",connect.connection.name);
    }catch(error){
            console.log(error);
    }
}
module.exports=dbConnect;