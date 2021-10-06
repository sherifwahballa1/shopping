const { randomBytes } = require('crypto');

const products = require('./../products-data/products');
const catchAsync = require('./../../../helper/catchAsync');
const { productValidationSchema } = require('../validations/validation');

addProduct = catchAsync(async (req, res) => {
    let { error, value } = productValidationSchema.validate(req.body, { stripUnknown: true });
    if (error) return res.status(400).json({ message: error.message.replace(/"/g, '') });

    // generate random id
    let id = randomBytes(4).toString("hex");
    value.id = id;
    products[id] = value;

    return res.status(200).send(products[id])
});

module.exports = addProduct;