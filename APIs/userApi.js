const exp = require("express");
//create a mini-express app
const userApp = exp.Router();

let usersCollection;
userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  next();
});

//get all users
userApp.get("/users", async (req, res, next) => {
  try {
    //read all users
    let usersList = await usersCollection.fnd().toArray();
    //send res
    res.status(200).send({ message: "users", payload: usersList });
  } catch (err) {
    //handover the error to error handler middleware
    next(err);
  }
});

//get user by id
userApp.get("/users/:userId", async (req, res) => {
  //get user id from url params
  let userId = Number(req.params.userId);
  //find user by id
  let user = await usersCollection.findOne({ userId: userId });
  //send res
  res.status(200).send({ message: "user", payload: user });
});

//post req handler
userApp.post("/user", async (req, res) => {
  //get user from client
  const user = req.body;
  //save to usersCollection
  let dbRes = await usersCollection.insertOne(user);
  //console.log(dbRes)
  //send res
  if (dbRes.acknowledged === true) {
    res.status(201).send({ message: "User created" });
  } else {
    res.status(500).send({ message: "something went wrong" });
  }
});

//put req handler
userApp.put("/user", async (req, res) => {
  //get modified user from client
  const user = req.body;
  //update user by id
  let dbRes = await usersCollection.updateOne(
    { userId: user.userId },
    { $set: { ...user } }
  );
  console.log(dbRes);
  //send res
  res.status(200).send({ message: "User updated" });
});

//delete user by id
userApp.delete("/user/:id", (req, res) => {});

//export userApp
module.exports = userApp;
