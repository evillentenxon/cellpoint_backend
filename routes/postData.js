// routes/postData.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route to insert data from the HTML form
router.post('/sent', postController.postData);

//Route to fetch data from the database
router.get('/fetchData',postController.fetchData);

module.exports = router;
