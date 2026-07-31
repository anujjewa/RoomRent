const { body } = require("express-validator");

const roomValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("price")
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0"),

    body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("contact")
        .trim()
        .notEmpty()
        .withMessage("Contact is required"),

    body("roomType")
        .optional()
        .isIn([
            "single",
            "shared",
            "1bhk",
            "2bhk",
            "3bhk",
            "pg",
        ])
        .withMessage("Invalid room type"),

    body("bedrooms")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Bedrooms cannot be negative"),

    body("bathrooms")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Bathrooms cannot be negative"),

    body("furnishing")
        .optional()
        .isIn([
            "furnished",
            "semi-furnished",
            "unfurnished",
        ])
        .withMessage("Invalid furnishing type"),

    body("area")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Area cannot be negative"),

    body("floor")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Floor cannot be negative"),
];

module.exports = {
    roomValidation,
};