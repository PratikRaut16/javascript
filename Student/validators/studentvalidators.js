const { body } = require("express-validator");

const createStudent  = [ 
   body('firstName')
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

  body('age')
    .notEmpty().withMessage('Age is required')
    .isInt({ min: 6, max: 100 }).withMessage('Age must be a number between 1 and 100'),

  body('department')
    .notEmpty().withMessage('Department is required')
    .isLength({ min: 2 }).withMessage('Department name must be at least 2 characters'),

];

const updateStudent = [
    body("firstName")
      .notEmpty().withMessage("First name is required")
      .isLength({min : 2 , max : 50}).withMessage("First name must be between 2 to 50 characters"),

    body("lastName")
      .notEmpty().withMessage("Last name is required")
      .isLength({min: 2 , max : 50}).withMessage("Last name must be between 2 to 50 characters"),

    body("age")
      .notEmpty().withMessage("Age is required")
      .isInt({min: 6 , max : 100}).withMessage("Age must integer and be between 6 to 100"),

    body("department")
      .notEmpty().withMessage("Department is required")
      .isLength({min : 2 , max: 50}).withMessage("Department must be between 2 and 50 characters"),

];

module.exports = {
    createStudent,
    updateStudent,
}