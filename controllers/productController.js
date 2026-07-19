const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    
    if (!product) {
      res.status(404).json({message: 'Product not found'})
      return;
    }
    
    res.json(product);
    
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    
    if (!product) {
      res.status(404).json({message: 'Product not found'})
      return;
    }
    
    res.json(product);
    
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    
    if (!product) {
      res.status(404).json({message: 'Product not found'})
      return;
    }
    
    res.json(product);
    
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
}