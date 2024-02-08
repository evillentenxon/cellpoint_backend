// models/mobiles.js
const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
  title: String,
  price: Number,
  brand: String,  
  category: String,  
  image: String
});

const Mobile = mongoose.model('Mobile', mobileSchema);

module.exports = Mobile;

