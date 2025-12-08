const express = require('express');
const cors = require('cors');
const { products } = require('../src/data/products');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Get all products
app.get('/api/pharmacy/products', (req, res) => {
  res.json(products);
});

// Get batches for a specific product
app.get('/api/pharmacy/products/:productId/batches', (req, res) => {
  const { productId } = req.params;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product.batches || []);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
