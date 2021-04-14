var express = require("express");
var app = express();
const path = require("path");
var fileupload = require("express-fileupload");
var multer = require("multer");
var cors = require("cors");
var fs = require("fs");

app.use(cors());
app.use(fileupload());
app.use("/files", express.static(__dirname + "/files"));

app.post("/upload", (req, res, next) => {
  console.log(req.files);
  let imageFile = req.files.file;
  //   fs.writeFile(`file/${req.files.file.name}`, req.files.file.data, (err) => {

  imageFile.mv(`${__dirname}/files/${req.files.file.name}`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ file: `files/${req.files.file.name}` });
  });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(8000, function () {
  console.log("App running on port 8000");
});
