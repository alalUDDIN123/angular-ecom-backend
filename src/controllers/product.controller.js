
const ProductModel = require("../models/Product.js");
const { sendResponse } = require("../utils/apiResponse.ts");

/* =========================
   ADD PRODUCT (SELLER)
========================= */
const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Failed to create product",
      errors: error.message
    });
  }
};

/* =========================
   GET ALL PRODUCTS
========================= */
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Products fetched successfully",
      data: products
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message: "Failed to fetch products",
      errors: error.message
    });
  }
};

/* =========================
   GET SINGLE PRODUCT
========================= */
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "Product not found",
        data: null
      });
    }

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product fetched successfully",
      data: product
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Invalid product id",
      errors: error.message
    });
  }
};

/* =========================
   SEARCH PRODUCT
========================= */
const searchProduct = async (req, res) => {
  try {
    const { q } = req.query 

    if (!q) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Search query is required",
        data: null
      });
    }

    const products = await ProductModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Search results fetched successfully",
      data: products
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message: "Search failed",
      errors: error.message
    });
  }
};

/* =========================
   EDIT PRODUCT (SELLER)
========================= */
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "Product not found",
        data: null
      });
    }

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Failed to update product",
      errors: error.message
    });
  }
};

/* =========================
   DELETE PRODUCT (SELLER)
========================= */
 const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "Product not found",
        data: null
      });
    }

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product deleted successfully",
      data: null
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Failed to delete product",
      errors: error.message
    });
  }
};


const productController = {
  createProduct,
  getAllProducts, 
  getSingleProduct,
  searchProduct,
  editProduct,
  deleteProduct
};

module.exports = { productController };