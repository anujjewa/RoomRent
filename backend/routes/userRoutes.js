const express = require("express");

const router = express.Router();


const protect = require(
    "../middleware/authMiddleware"
);


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
    registerUser
);


router.post(
    "/login",
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