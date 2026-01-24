const CartModel = require("../models/Cart");

// ADD TO CART
const addToCart = async (req, res) => {
  const cartItem = new CartModel(req.body);
  await cartItem.save();
  res.status(201).json(cartItem);
};

// GET USER CART
const getUserCart = async (req, res) => {
  const { userId } = req.params;

  const cartItems = await CartModel.find({ userId })
    .populate("productId")
    .populate("userId");

  res.json(cartItems);
};

// REMOVE CART ITEM
const removeCartItem = async (req, res) => {
  await CartModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed from cart" });
};

const cartController = {
  addToCart,
  getUserCart,
  removeCartItem
};

module.exports = { cartController };