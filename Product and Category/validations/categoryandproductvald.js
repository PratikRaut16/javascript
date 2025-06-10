const { body } = require('express-validator');

const validateCreateCategoryWithProducts = [
  body('category_name')
    .notEmpty().withMessage('Category name is required')
    .isString().withMessage('Category name must be a string'),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  body('status')
    .isBoolean().withMessage('Status must be a boolean'),

  body('products')
    .isArray({ min: 1 }).withMessage('At least one product is required'),

  body('products.*.product_name')
    .notEmpty().withMessage('Product name is required')
    .isString().withMessage('Product name must be a string'),

  body('products.*.price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a valid number'),

  body('products.*.stock_quantity')
    .notEmpty().withMessage('Stock quantity is required')
    .isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),

];

const validateCreateProduct = [
  body('category_id')
    .notEmpty().withMessage('Category ID is required')
    .isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),

  body('product_name')
    .notEmpty().withMessage('Product name is required')
    .isString().withMessage('Product name must be a string'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),

  body('stock_quantity')
    .notEmpty().withMessage('Stock quantity is required')
    .isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
];

const validateUpdateCategory = [
  body('category_name')
    .optional()
    .isString().withMessage('Category name must be a string'),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  body('status')
    .optional()
    .isBoolean().withMessage('Status must be a boolean'),
];

const validateUpdateProduct = [
  body('category_id')
    .optional()
    .isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),

  body('product_name')
    .optional()
    .isString().withMessage('Product name must be a string'),

  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),

  body('stock_quantity')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
];


module.exports = {
  validateCreateCategoryWithProducts,
  validateCreateProduct,
  validateUpdateCategory,
  validateUpdateProduct,
};
