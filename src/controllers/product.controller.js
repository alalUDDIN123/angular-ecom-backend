const ProductModel = require("../models/Product");


// ADD PRODUCT
const createProduct = async (req, res) => {
  const product = new ProductModel(req.body);
  await product.save();
  res.status(201).json(product);
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
};

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById({ _id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid product id"
    });
  }
}

// SEARCH PRODUCT

const searchProduct = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const products = await ProductModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed"
    });
  }
}

// GET ALL PRODUCTS
const editProduct = async (req, res) => {

  res.json({ message: "Edit product endpoint" });
};
// GET ALL PRODUCTS
const deleteProduct = async (req, res) => {
  res.json({ message: "Delete product endpoint" });
};
const productController = {
  getAllProducts,
  getSingleProduct,
  searchProduct,
  createProduct,
  editProduct,
  deleteProduct

};

module.exports = { productController };
