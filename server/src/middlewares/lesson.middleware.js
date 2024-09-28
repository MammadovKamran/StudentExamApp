/** @format */

const { body, validationResult } = require("express-validator");

const validateLesson = [
  body("lessonCode")
    .isLength({ min: 3, max: 3 })
    .withMessage("Dərsin kodu 3 simvoldan ibarət olmalıdır.")
    .isAlphanumeric()
    .withMessage("Dərsin kodu yalnız hərf və rəqəmlərdən ibarət olmalıdır."),
  body("name")
    .isLength({ max: 30 })
    .withMessage("Dərsin adı maksimum 30 simvol olmalıdır."),
  body("teacherName")
    .isLength({ max: 20 })
    .withMessage("Müəllimin adı maksimum 20 simvol olmalıdır."),
  body("teacherSurname")
    .isLength({ max: 20 })
    .withMessage("Müəllimin soyadı maksimum 20 simvol olmalıdır."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateLesson };
