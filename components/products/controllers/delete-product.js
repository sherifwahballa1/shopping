const products = require('./../products-data/products');
const { users } = require('./../../cart/');
const catchAsync = require('./../../../helper/catchAsync');

deleteProduct = catchAsync(async (req, res) => {
    let productId = req.params.id;

    // check if product not found
    if (!Object.keys(products).includes(productId))
        return res.status(404).json({ message: "Product not found" });

    delete products[productId];

    // remove this item from all cart lists of users
    Object.entries(users).forEach(([key, value]) => {
        let index = value.cartList.findIndex(el => el.productId === productId);
        value.cartList.splice(index, 1);
    })

    return res.status(200).json({ message: "product deleted successfully"})
});

module.exports = deleteProduct;