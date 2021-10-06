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

const productValidation = {
  name: joi
    .string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z ]+$/)
    .min(2)
    .max(50)
    .messages({
      "string.base": `product name must be consists of letters only`,
      "string.empty": `product name cannot be an empty field`,
      "string.min": `product name should have a minimum length of {#limit} (letters)`,
      "string.max": `product name should have a maximum length of {#limit} (letters)`,
      "string.pattern.base": `product name must be consists of letters only`,
      "any.required": `product name is required`,
    }),

  quentity: joi.number().min(1).required().messages({
    "number.base": `quentity must be number and at least 1`,
    "number.empty": `quentity cannot be an empty field`,
    "string.min": `quentity should have a minimum {#limit}`,
    "any.required": `quentity is required`,
  }),

  price: joi.number().min(1).required().messages({
    "number.base": `price must be number and at least 1`,
    "number.empty": `price cannot be an empty field`,
    "string.min": `price should have a minimum {#limit}`,
    "any.required": `price is required`,
  }),
};

const updateProductValidation = {
  name: joi
    .string()
    .trim()
    .pattern(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": `product name must be consists of letters only`,
      "string.empty": `product name cannot be an empty field`,
      "string.min": `product name should have a minimum length of {#limit} (letters)`,
      "string.max": `product name should have a maximum length of {#limit} (letters)`,
      "string.pattern.base": `product name must be consists of letters only`,
      "any.required": `product name is required`,
    }),

  quentity: joi.number().min(1).messages({
    "number.base": `quentity must be number and at least 1`,
    "number.empty": `quentity cannot be an empty field`,
    "string.min": `quentity should have a minimum {#limit}`,
    "any.required": `quentity is required`,
  }),

  price: joi.number().min(1).messages({
    "number.base": `price must be number and at least 1`,
    "number.empty": `price cannot be an empty field`,
    "string.min": `price should have a minimum {#limit}`,
    "any.required": `price is required`,
  }),
};

module.exports = {
  pagination: joi.object(paginationSchema),
  productValidationSchema: joi.object(productValidation),
  updateProductValidationSchema: joi.object(updateProductValidation),
};
