const productsData = require("./../../products/products-data/products");
const users = require("./../cart-data/cart");
const catchAsync = require("./../../../helper/catchAsync");

addToCart = catchAsync(async (req, res) => {
  let productId = req.params.productId;
  let userID = req.userInfo.id;

  if (!userID) return res.status(401).json({ message: "Not Authorized User" });

  // check if product exists
  if (!Object.keys(productsData).includes(productId))
    return res.status(404).json({ message: "Product not found" });

  // check if product quentity available
  if (productsData[productId].quentity <= 0)
    return res.status(404).json({ message: "Product out of stock" });

  // check if the product existing in the user's cart before
  let productExistInCart = users[userID].cartList.findIndex(
    (el) => el.productId === productId
  );

  if (productExistInCart > -1) {
    users[userID].cartList[productExistInCart].quentity += 1;
  } else {
    users[userID].cartList.push({
      productId,
      quentity: 1,
    });
  }

  // decrease the quentity of the product
  productsData[productId].quentity -= 1;

  res.status(200).json({ message: "Product added successfully into your cart" });
});

module.exports = addToCart;
