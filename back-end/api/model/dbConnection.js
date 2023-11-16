const mongoose=require('mongoose');

    const connectDB=async()=>{

        
try{
    await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
    console.log("connected to mongo db");
    }


catch(e){
        console.log("connection to mongodb failed");
    }
}


module.exports = connectDB;