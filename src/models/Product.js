const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        category: String,
        color: String,
        image: String,
        description: String
    },
    {
        timestamps: true,
        collection: "angularproducts",
        versionKey: false
    }
);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
