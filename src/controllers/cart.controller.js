const CartModel = require("../models/Cart");
const { sendResponse } = require("../utils/apiResponse.ts");


/* =========================
   ADD TO CART
========================= */
const addToCart = async (req, res) => {
  try {
    const {
      productId,
      userId,
      name,
      price,
      category,
      color,
      image,
      description,
      quantity
    } = req.body;

    // 🔎 Basic validation
    if (!productId || !userId || !quantity) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Missing required cart fields",
        data: null
      });
    }

    if (quantity <= 0) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Quantity must be greater than zero",
        data: null
      });
    }

    // 🛑 Optional: prevent duplicate cart item
    const existingItem = await CartModel.findOne({ productId, userId });
    if (existingItem) {
      return sendResponse(res, {
        success: false,
        statusCode: 409,
        message: "Product already exists in cart",
        data: null
      });
    }

    // ✅ Create cart item
    const cartItem = await CartModel.create({
      productId,
      userId,
      name,
      price,
      category,
      color,
      image,
      description,
      quantity
    });

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Product added to cart successfully",
      data: cartItem
    });

  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message: "Failed to add product to cart",
      errors: error.message
    });
  }
};

/* =========================
   GET USER CART
========================= */
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "User ID is required",
        data: null
      });
    }

    const cartItems = await CartModel
      .find({ userId })
      .populate("productId");

    const formattedCart = cartItems.map(item => ({
      cartItemId: item._id,
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      image: item.productId.image,
      category: item.productId.category,
      color: item.productId.color,
      description: item.productId.description,
      quantity: item.quantity
    }));

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Cart items fetched successfully",
      data: formattedCart
    });


  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message: "Failed to fetch cart items",
      errors: error.message
    });
  }
};

/* =========================
   REMOVE CART ITEM
========================= */
const removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    if (!cartItemId) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Cart item id is required",
        data: null
      });
    }

    const deletedItem = await CartModel.findByIdAndDelete(cartItemId);

    if (!deletedItem) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "Cart item not found",
        data: null
      });
    }

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Item removed from cart",
      data: null
    });

  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: 500,
      message: "Failed to remove cart item",
      errors: error.message
    });
  }
};


const cartController = {
  addToCart,
  getUserCart,
  removeCartItem
};

module.exports = { cartController };