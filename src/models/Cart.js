const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    },
    {
        timestamps: true,
        collection: "cart_items",
        versionKey: false
    }
);

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;