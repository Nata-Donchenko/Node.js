require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

connectDB()

app.use('/api/products', productRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
})
