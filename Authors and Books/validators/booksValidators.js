const { body } = require("express-validator");

const createbook = [
  body("author_id")
    .notEmpty().withMessage("Author ID is required")
    .isInt({ min: 1 }).withMessage("Author ID must be a valid positive integer"),

  body("name")
    .notEmpty().withMessage("Book name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Book name must be 2-100 characters"),

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

  body("name")
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage("Book name must be 2-100 characters"),

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
