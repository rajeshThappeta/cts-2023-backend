//create express application
const exp = require("express");
const app = exp();

//get mongodb client
const mc=require('mongodb').MongoClient;
//connect to mongodb server
mc.connect('mongodb://localhost:27017')
.then((client)=>{
  
  //get db object
  const dbObj=client.db('sampledb')
  //get collection obj
  const usersCollection=dbObj.collection('users')
  //add usersCoolection to express onj(app)
  app.set('usersCollection',usersCollection)
  
  console.log("connected to database server")
})
.catch(err=>{
  console.log("err in DB connect",err)
})



//import userApp & productApp
const userApp=require('./APIs/userApi');
const productApp=require('./APIs/productApi')
//add body parser
app.use(exp.json());


//if path starts woth /user-api, execute userApp
app.use('/user-api',userApp)
app.use('/product-api',productApp)

//error handling middleware
function errorHandler(err, req, res, next) {
  res.send({ message: "error occurred", payload: err.message });
}

app.use(errorHandler);

//assign port numbrt
app.listen(4000, () => console.log("http server listenning on port 4000..."));
