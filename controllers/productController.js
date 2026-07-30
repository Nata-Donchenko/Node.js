const Product = require('../models/productModel');

const cache = {};

const getAllProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const cacheKey = `${page}-${limit}`;
    
    const now = Date.now();
    const cached = cache[cacheKey];
    
    if (cached && now - cached.timestamp < 30000) {
      console.log('Дані повернуто з кешу');
      return res.json(cached.data);
    }
    
    const products = await Product.find().skip(skip).limit(limit);
    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    
    const result = {
      products,
      totalCount,
      currentPage: page,
      totalPages,
    };
    
    cache[cacheKey] = {
      data: result,
      timestamp: now,
    };
    
    console.log('Дані повернуто з бази даних');
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    
    Object.keys(cache).forEach((key) => delete cache[key]);
    
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    Object.keys(cache).forEach((key) => delete cache[key]);
    
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    Object.keys(cache).forEach((key) => delete cache[key]);
    
    res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};