// models/mobiles.js
const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
  title: String,
  price: Number,
  brand: String,  
  category: String,  
  image: String
});

const userDataSchema= new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
  message: String,
  image: String
})

const Mobile = mongoose.model('Mobile', mobileSchema);
const UserData= mongoose.model('client_datas',userDataSchema);

module.exports = {Mobile,UserData};

