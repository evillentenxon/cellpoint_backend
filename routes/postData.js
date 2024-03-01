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
  

// sent data into the database
router.post('/sent', postController.postData);

//sent client data or message into the database
router.post('/collectData',upload.single('image'),postController.clientData);

//fetch the products from the database
router.get('/fetchData',postController.fetchData);

//fetch the client message 
router.get('/userData', postController.collectUserMsg);

//search
router.get('/search',postController.searchItem);

module.exports = router;
