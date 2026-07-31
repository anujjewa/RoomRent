const express = require("express");

const router = express.Router();


const protect = require(
    "../middleware/authMiddleware"
);

const validateRequest = require("../middleware/validation/validateRequest");

const {
    registerValidation,
    loginValidation,
} = require("../middleware/validation/userValidation");


const {

    registerUser,

    loginUser,

    getProfile,

    updateProfile,

    toggleFavorite,

    clearFavorites,

} = require(
    "../controllers/userController"
);


/* =========================================================
   AUTH ROUTES
========================================================= */

router.post(
    "/register",
    registerValidation,
    validateRequest,
    registerUser
);

router.post(
    "/login",
    loginValidation,
    validateRequest,
    loginUser
);
/* =========================================================
   USER PROFILE ROUTES
========================================================= */

router.get(
    "/profile",
    protect,
    getProfile
);


router.patch(
    "/profile",
    protect,
    updateProfile
);


/* =========================================================
   FAVORITE ROUTES
========================================================= */

router.patch(
    "/favorites/:roomId",
    protect,
    toggleFavorite
);


router.delete(
    "/favorites",
    protect,
    clearFavorites
);


module.exports = router;