var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './upload')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

var upload = multer({storage:storage}).single("file");

router.post('/upload', function(req, res){
  upload(req, res, function(err){
    var oldPath = 'upload/' + req.file.originalname;
    var newPath = 'upload/' + Date.now() + '-' + req.file.originalname; 
    fs.rename(oldPath, newPath, err => {
      if(err) return res.end("Error uploading file...");
      res.end('File is uploaded');
    });
  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
