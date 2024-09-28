/** @format */
const { body, validationResult } = require("express-validator");

const validateExam = [
  body("lessonCode")
    .isLength({ min: 3, max: 3 })
    .withMessage("Dərsin kodu 3 simvoldan ibarət olmalıdır.")
    .isAlphanumeric()
    .withMessage("Dərsin kodu yalnız hərf və rəqəmlərdən ibarət olmalıdır."),
  body("studentNum")
    .isInt({ min: 10000, max: 99999 })
    .withMessage("Şagirdin nömrəsi 5 rəqəmdən ibarət olmalıdır."),
  body("examDate")
    .isISO8601()
    .withMessage("İmtahan tarixi düzgün formatda olmalıdır (YYYY-MM-DD)."),
  body("score")
    .isInt({ min: 0, max: 10 })
    .withMessage("Qiymət 0 ilə 10 arasında bir rəqəm olmalıdır."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateExam };
