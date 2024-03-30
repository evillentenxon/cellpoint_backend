const { Mobile, UserData } = require('../models/myModel');
const axios = require('axios');

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

exports.fetchData = async (req, res) => {
  try {
    const { search } = req.query;

    const query = search
      ? {
        $or: [
          { title: { $regex: new RegExp(search, 'i') } },
          { brand: { $regex: new RegExp(search, 'i') } },
          { category: { $regex: new RegExp(search, 'i') } },
        ],
      }
      : {};

    const data = await Mobile.find(query);
    res.json({ data });
  }
  catch (error) {
    console.error('Error fetching data: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.clientData = async (req, res) => {
  try {
    // Fetch data from the HTML form
    const { name, gender, email, message } = req.body;

    // Use req.file.path to get the path of the uploaded file
    const image = req.file ? req.file.path : undefined;

    // Create a new document using the Mongoose model
    const newData = new UserData({ name, gender, email, message, image });

    // Save the document to the database
    await newData.save();

    res.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.collectUserMsg = async (req, res) => {
  try {
    const data = await UserData.find();
    res.json({ data });
  }
  catch (error) {
    console.error('Error fetching data: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.productDetails = async(req, res) => {
  try {
    const { itemId } = req.params;
    const product = await Mobile.findById(itemId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ data: product });
  } catch (error) {
    console.error('Error fetching product details: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.productCategory = async (req, res) => {
  try {
    const { itemCategory } = req.params;
    const products = await Mobile.find({ category: itemCategory });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found for the specified category' });
    }

    res.json({ data: products });
  } catch (error) {
    console.error('Error fetching products by category: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.order= async(req,res)=>{
  try {
    const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key 831c7083d7f44fe280b3c15cce1dd053`,
      }
    });

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
}