const { body } = require("express-validator");
const { Author } = require("../models"); // adjust the path as needed

const createauthor = [
  body("authorname")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only alphabets and spaces"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .custom(async (value) => {
      const existing = await Author.findOne({ where: { email: value } });
      if (existing) {
        throw new Error("This email is already exist");
      }
      return true;
    }),

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
  body("authorname")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only alphabets and spaces"),

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
