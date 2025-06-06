const { body } = require("express-validator");

const createbook = [
  body("bookname")
    .notEmpty().withMessage("Book name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters")
    .matches(/^[a-zA-Z0-9\s.,:;'"()\-]+$/).withMessage("Book name contains invalid characters"),


  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("pages")
    .notEmpty().withMessage("Pages are required")
    .isInt({ min: 1 }).withMessage("Pages must be at least 1"),

  body("publication")
    .notEmpty().withMessage("Publication is required")
    .isLength({ min: 2 }).withMessage("Publication must be at least 2 characters"),

  body("genre")
    .notEmpty().withMessage("Genre is required")
    .isLength({ min: 2 }).withMessage("Genre must be at least 2 characters"),

  body("is_deleted")
    .optional()
    .isBoolean().withMessage("is_deleted must be a boolean value"),
];



const updatebook = [
  body("author_id")
    .optional()
    .isInt({ min: 1 }).withMessage("Author ID must be a valid positive integer"),

  body("bookname")
    .optional()
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only alphabets and spaces"),
    
  body("price")
    .optional()
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("pages")
    .optional()
    .isInt({ min: 1 }).withMessage("Pages must be at least 1"),

  body("publication")
    .optional()
    .isLength({ min: 2 }).withMessage("Publication must be at least 2 characters"),

  body("genre")
    .optional()
    .isLength({ min: 2 }).withMessage("Genre must be at least 2 characters"),

  body("is_deleted")
    .optional()
    .isBoolean().withMessage("is_deleted must be a boolean value"),
];

module.exports = {
  createbook,
  updatebook,
};
