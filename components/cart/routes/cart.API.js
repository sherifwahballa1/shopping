const express = require("express");
const { isAuth } = require("./../../../security");

const router = express.Router({ caseSensitive: false });

const { cartList } = require("./../controllers");

router.post("/:productId", isAuth, addToCart);
router.get("/", isAuth, cartList);
router.delete("/:id", isAuth, removeFromList);

module.exports = router;
