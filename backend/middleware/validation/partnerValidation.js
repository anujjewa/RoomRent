const { body } = require("express-validator");

const partnerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("age")
        .isInt({ min: 18 })
        .withMessage("Age must be at least 18"),

    body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required"),

    body("occupation")
        .trim()
        .notEmpty()
        .withMessage("Occupation is required"),

    body("genderPreference")
        .trim()
        .notEmpty()
        .withMessage("Gender preference is required"),

    body("contact")
        .trim()
        .notEmpty()
        .withMessage("Contact is required"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Description cannot exceed 1000 characters"),
];

module.exports = {
    partnerValidation,
};