const users = require("./../cart-data/cart");
const productsData = require("./../../products/products-data/products");

const catchAsync = require("./../../../helper/catchAsync");

removeFromList = catchAsync(async (req, res) => {
  let userID = req.userInfo.id;
  if (!userID) return res.status(401).json({ message: "Not Authorized User" });

  let productId = req.params.id;

  let index = users[userID].cartList.findIndex(
    (el) => el.productId === productId
  );

  if (index < 0)
    return res.status(404).json({ message: "Product not found in cart list" });

  // product quentity in user cart list
  let prod_quentity = users[userID].cartList[index].quentity;
  /* 
        in DB the following processes needs consistency and atomicity 
        we can use Promise.all([]);
        or mongoose.startSession(); && endSession();
    */

  // remove product from cart list
  users[userID].cartList.splice(index, 1);

  // retrieve the quentity to the origin product
  productsData[productId].quentity += prod_quentity;

  return res
    .status(200)
    .json({ message: "product deleted successfully from cart list" });
});

module.exports = removeFromList;
