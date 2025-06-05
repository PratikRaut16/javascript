const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "validation failed",
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg,
                value: err.value,        
                location: err.location   
            }))
        });
    }

    next();
};

















// const { validationResult } = require('express-validator');

// module.exports = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       status: 'validation_failed',
//       errors: errors.array().map(err => ({
//         field: err.param,
//         message: err.msg
//       }))
//     });
//   }
//   next();
// };
