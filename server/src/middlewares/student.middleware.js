/** @format */
const { body, validationResult } = require("express-validator");

const validateStudent = [
  body("studentNum")
    .isInt({ min: 10000, max: 99999 })
    .withMessage("Şagirdin nömrəsi 5 rəqəmdən ibarət olmalıdır."),
  body("name").isLength({ max: 30 }).withMessage("Ad maksimum 30 simvol olmalıdır."),
  body("surname")
    .isLength({ max: 30 })
    .withMessage("Soyad maksimum 30 simvol olmalıdır."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateStudent };
