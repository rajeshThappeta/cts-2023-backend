const exp = require("express");
const productApp = exp.Router();

//create products api
productApp.get("/products", (req, res) => {
  res.send({ mesage: "products" });
});

//export prodyuctApp
module.exports = productApp;
