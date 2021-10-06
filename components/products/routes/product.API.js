const express = require("express");
const router = express.Router({ caseSensitive: false });

const {
  addProduct,
  updateProduct,
  getProducts,
  deleteProduct,
} = require("./../controllers");

router.get("/", getProducts);
router.post("/", addProduct);
router.patch("/:productId", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
