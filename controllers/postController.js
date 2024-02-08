// controllers/postController.js
const Mobile = require('../models/myModel');

exports.postData = async (req, res) => {
  try {
    // Fetch data from the HTML form
    const { title, price, brand, category, image } = req.body;

    // Create a new document using the Mongoose model
    const newMobile = new Mobile({ title, price, brand, category, image });

    // Save the document to the database
    await newMobile.save();

    res.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.fetchData=async(req,res)=>{
  try{
    const data= await Mobile.find();
    res.json({data});
  }
  catch(error){
    console.error('Error fetching data: ',error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};
