// routes/postData.js
const express = require('express');
const router = express.Router();
const multer= require('multer');
const postController = require('../controllers/postController');
const path= require('path');

//setup multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/images/')); // specify the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // specify the image file name
    }
  });
  
  const upload = multer({ storage: storage });
  

// Route to insert data from the HTML form
router.post('/sent', postController.postData);

router.post('/collectData',upload.single('image'),postController.clientData);

//Route to fetch data from the database
router.get('/fetchData',postController.fetchData);

router.get('/userData/', postController.collectUserMsg);

module.exports = router;
