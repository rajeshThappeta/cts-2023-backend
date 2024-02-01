//create express application
const exp = require("express");
const app = exp();

//add body parser
app.use(exp.json());

//sample user data
let users = [
  { id: 100, name: "ravi" },
  { id: 200, name: "bhanu" },
];

//USER API (routes)

//get all users
app.get("/users", (req, res) => {
  res.send({ message: "all users", payload: users });
});

//get user by id
app.get("/users/:id", (req, res) => {
  //get url param value
  let id = Number(req.params.id);
  //find user by id
  let user = users.find((userObj) => userObj.id === id);
  //if user not found
  if (user === undefined) {
    res.send({ message: "User not found" });
  } else {
    res.send({ message: "user", payload: user });
  }
});

//post req handler
app.post("/user", (req, res) => {
  //get user obj from req
  let newUser = req.body;
  //insert new user in the users list
  users.push(newUser);
  //send res
  res.send({ message: "New user created" });
});


//put req handler
app.put('/user',(req,res)=>{
    //get modified user obj from req
    let modifiedUser=req.body;
    //replace old user with modifiedUser obj
    let index=users.findIndex(userObj=>userObj.id===modifiedUser.id)
    users.splice(index,1,modifiedUser)
    //send res
    res.send({message:"User modified"})
})

//delete user by id
app.delete('/user/:id',(req,res)=>{
     //get url param value
  let id = Number(req.params.id);
   //find id of user to be removed 
   let index=users.findIndex(userObj=>userObj.id===id)
   //delete user 
   users.splice(index,1)
     //send res
     res.send({message:"User removed"})
})

//create products api

//assign port numbrt
app.listen(4000, () => console.log("http server listenning on port 4000..."));
