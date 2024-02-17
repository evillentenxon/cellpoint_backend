// routes/postData.js
const express = require('express');
const router = express.Router();
const multer= require('multer');
const postController = require('../controllers/postController');

//setup multer storage
const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/images/');
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
});

const upload=multer({storage:storage});


// Route to insert data from the HTML form
router.post('/sent', postController.postData);

router.post('/collectData',postController.clientData);

//Route to fetch data from the database
router.get('/fetchData',postController.fetchData);

router.get('/userData/',postController.collectUserMsg);

router.post('/upload', upload.single('image'), postController.submit);

module.exports = router;
