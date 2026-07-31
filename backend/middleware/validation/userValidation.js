const { body } = require("express-validator");

/* =========================================================
   REGISTER VALIDATION
========================================================= */

const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .isIn(["owner", "renter"])
        .withMessage("Role must be owner or renter"),
];

/* =========================================================
   LOGIN VALIDATION
========================================================= */

const loginValidation = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),
];

module.exports = {
    registerValidation,
    loginValidation,
};