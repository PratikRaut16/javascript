const { body } = require("express-validator");

const createauthor = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("phone")
    .notEmpty().withMessage("Phone number is required")
    .isMobilePhone().withMessage("Invalid phone number"),

  body("age")
    .notEmpty().withMessage("Age is required")
    .isInt({ min: 10, max: 120 }).withMessage("Age must be between 10 and 120"),

  body("address")
    .notEmpty().withMessage("Address is required")
    .isLength({ min: 5 }).withMessage("Address must be at least 5 characters"),
];

const updateauthor = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("phone")
    .notEmpty().withMessage("Phone number is required")
    .isMobilePhone().withMessage("Invalid phone number"),

  body("age")
    .notEmpty().withMessage("Age is required")
    .isInt({ min: 10, max: 120 }).withMessage("Age must be between 10 and 120"),

  body("address")
    .notEmpty().withMessage("Address is required")
    .isLength({ min: 5 }).withMessage("Address must be at least 5 characters"),
];

module.exports = {
  createauthor,
  updateauthor,
};
