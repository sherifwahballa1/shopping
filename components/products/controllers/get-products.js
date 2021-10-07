const products = require('./../products-data/products');
const catchAsync = require('./../../../helper/catchAsync');
const { pagination: paginationSchema } = require('../validations/validation');


getProducts = catchAsync(async (req, res) => {
    // validate if pagination inputs(query) exists
    let { error, value } = paginationSchema.validate(req.query, { stripUnknown: true });
    if (error) return res.status(400).json({ message: error.message.replace(/"/g, '') });

    // set default pagination inputs if not found
    if (!value.limitNo) value.limitNo = 50;
    if (!value.pageNo) value.pageNo = 0;

    // validate products quentity to retrieve existing products
    let filteredProducts = Object.values(products).filter(product => { return product.quentity > 0 });

    if (filteredProducts.length === 0) return res.status(404).json({ message: "There are no products available", error: "404: Not Found" });

    // pagination equations (limit, page)
    // retrieve part of products on demand
    let productsByPage = Object.values(filteredProducts).slice((value.limitNo * value.pageNo), (value.limitNo * (value.pageNo + 1)));

    return res.status(200).send({ products: productsByPage, count: Object.keys(products).length })
});

module.exports = getProducts;




