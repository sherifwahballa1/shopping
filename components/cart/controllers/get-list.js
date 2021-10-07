const users = require("./../cart-data/cart");
const productsData = require("./../../products/products-data/products");
const catchAsync = require("./../../../helper/catchAsync");
const { pagination: paginationSchema } = require("../validations/validation");

cartList = catchAsync(async (req, res) => {
  // validate if pagination inputs
  let { error, value } = paginationSchema.validate(req.query, {
    stripUnknown: true,
  });
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  let userID = req.userInfo.id;
  if (!userID) return res.status(401).json({ message: "Not Authorized User" });

  // set default pagination inputs if not exists
  if (!value.limitNo) value.limitNo = 50;
  if (!value.pageNo) value.pageNo = 0;

  // pagination equations (limit, page)
  // retrieve part of cart on demand
  let cartListByPage = users[userID].cartList.slice(
    value.limitNo * value.pageNo,
    value.limitNo * (value.pageNo + 1)
  );

  if (cartListByPage.length === 0)
    return res
      .status(200)
      .json({ message: "There are no products add to cart yet", list: [] });

  let productsInfoInList = [];
  let totalPrice = 0;
  
  cartListByPage.forEach((el) => {
    totalPrice += productsData[el.productId].price * el.quentity;
    productsInfoInList.push({
      name: productsData[el.productId].name,
      price: productsData[el.productId].price,
      id: el.productId,
      quentity: el.quentity,
    });
  });

  return res.status(200).send({ list: productsInfoInList, totalPrice });
});

module.exports = cartList;
