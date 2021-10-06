const express = require("express");
const router = express.Router({ caseSensitive: false });

const { addProduct } = require("./../controllers");

router.post("/", addProduct);

module.exports = router;
