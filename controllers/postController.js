const { Mobile, UserData } = require('../models/myModel');

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
