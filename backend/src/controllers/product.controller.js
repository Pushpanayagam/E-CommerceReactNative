import Product from "../models/product.model.js";

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json({
      success: true,
      data: product
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default {
  getProducts,
  getProduct
};
