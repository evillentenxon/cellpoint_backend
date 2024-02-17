const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postDataRoutes = require('./routes/postData');

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS for all routes
app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/cellpoint');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes defined in postData.js
app.use('/postData', postDataRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
