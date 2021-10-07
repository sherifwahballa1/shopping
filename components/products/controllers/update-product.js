const products = require('./../products-data/products');
const catchAsync = require('./../../../helper/catchAsync');
const { updateProductValidationSchema } = require('../validations/validation');

updateProduct = catchAsync(async (req, res) => {
    // validate inputs
    let { error, value } = updateProductValidationSchema.validate(req.body, { stripUnknown: true });
    if (error) return res.status(400).json({ message: error.message.replace(/"/g, '') });

    // check if any valid inputs existing
    if (Object.keys(value).length === 0) return res.status(400).json({ message: "Enter valid fields" });

    let productId = req.params.productId;

    // check product available
    if (!Object.keys(products).includes(productId))
        return res.status(404).json({ message: "Product not found" })

    // update the product info
    for (const [k, v] of Object.entries(products[productId])) {
        products[productId][k] = value[k] ? value[k] : v;
    }

    return res.status(200).send(products[productId])
});

module.exports = updateProduct;