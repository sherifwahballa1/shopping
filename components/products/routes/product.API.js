const express = require("express");
const router = express.Router({ caseSensitive: false });

const { addProduct, updateProduct } = require("./../controllers");

router.post("/", addProduct);
router.patch('/:productId', updateProduct);

module.exports = router;