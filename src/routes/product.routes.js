const express = require("express");
const { productController } = require("../controllers/product.controller");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/search", productController.searchProduct);
router.get("/:id", productController.getSingleProduct);
router.post("/add", productController.createProduct);
router.patch('/edit', productController.editProduct);
router.delete('/delete', productController.deleteProduct);


module.exports = router;
