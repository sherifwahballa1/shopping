const joi = require("joi");

const paginationSchema = {
  pageNo: joi
    .string()
    .trim()
    .pattern(/^[0-9]*$/) // find a way to limit the number according to number of documents
    .message("Enter a valid page number"),
  limitNo: joi
    .string()
    .trim()
    .pattern(/^[0-9]*$/) // find a way to limit the number according to number of documents
    .message("Enter a valid limit number"),
};

module.exports = {
  pagination: joi.object(paginationSchema),
};
