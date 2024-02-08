const multer = require("multer");
const path=require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });

userApp.post("/upload", upload.single("image"), function (req, res, next) {
  // const image = req.file.buffer
  console.log(req.file);
});
