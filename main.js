var express = require("express");
var app = express();
const path = require("path");
var fileupload = require("express-fileupload");
var multer = require("multer");
var cors = require("cors");
var fs = require("fs");

app.use(cors());
// app.use(fileupload());
app.use("/files", express.static(__dirname + "/files"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/uploadmultiple", upload.array("file", 12), (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send(files);
});

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(8000, function () {
  console.log("App running on port 8000");
});
