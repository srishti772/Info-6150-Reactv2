const express=require('express');
const app=express();
const port=8000 ;
const connectDB=require('./api/model/dbConnection');
const User=require('./api/model/user');
const bodyParser = require('body-parser')
const routes = require('./api/routes/routes')
const cors=require('cors')



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//enable cors
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); 
  next();
});

routes(app);



connectDB();
app.listen(port,()=>{
    console.log('listening on port',port);
})