const express = require("express");
const { isAuth } = require("./../../../security");

const router = express.Router({ caseSensitive: false });

const { addToCart } = require("./../controllers");

router.post("/:productId", isAuth, addToCart);

module.exports = router;
