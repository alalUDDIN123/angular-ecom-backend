const express = require("express");
const { cartController } = require("../controllers/cart.controller");
const router = express.Router();


router.post("/", cartController.addToCart);
router.get("/:userId", cartController.getUserCart);
router.delete("/:cartItemId", cartController.removeCartItem);

module.exports = router;
