const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


/* =========================================================
   REGISTER USER
========================================================= */

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role,
        } = req.body;


        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists",
            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        await User.create({

            name,

            email,

            password: hashedPassword,

            role,

        });


        res.status(201).json({

            message:
                "User Registered Successfully",

        });


    } catch (error) {

        console.log(
            "Register user error:",
            error
        );


        res.status(500).json({

            message: error.message,

        });

    }

};


/* =========================================================
   LOGIN USER
========================================================= */

const loginUser = async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;


        const user =
            await User.findOne({ email });


        if (!user) {

            return res.status(400).json({

                message: "Invalid Credentials",

            });

        }


        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isMatch) {

            return res.status(400).json({

                message: "Invalid Credentials",

            });

        }


        const token = jwt.sign(

            {

                id: user._id,

                role: user.role,

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d",

            }

        );


        res.status(200).json({

            token,

        });


    } catch (error) {

        console.log(
            "Login user error:",
            error
        );


        res.status(500).json({

            message: error.message,

        });

    }

};


/* =========================================================
   GET PROFILE
========================================================= */

const getProfile = async (req, res) => {

    try {

        const user =
            await User.findById(
                req.user.id
            ).select("-password");


        if (!user) {

            return res.status(404).json({

                message: "User not found",

            });

        }


        res.status(200).json(user);


    } catch (error) {

        console.log(
            "Get profile error:",
            error
        );


        res.status(500).json({

            message: error.message,

        });

    }

};


/* =========================================================
   UPDATE PROFILE
========================================================= */

const updateProfile = async (req, res) => {

    try {

        const {

            phone,

            dateOfBirth,

            address,

            occupation,

        } = req.body;


        const user =
            await User.findById(
                req.user.id
            );


        if (!user) {

            return res.status(404).json({

                message: "User not found",

            });

        }


        user.phone =
            phone ?? user.phone;


        user.dateOfBirth =
            dateOfBirth ??
            user.dateOfBirth;


        user.address =
            address ?? user.address;


        user.occupation =
            occupation ??
            user.occupation;


        const updatedUser =
            await user.save();


        res.status(200).json({

            message:
                "Profile updated successfully",

            user: {

                _id: updatedUser._id,

                name: updatedUser.name,

                email: updatedUser.email,

                role: updatedUser.role,

                phone: updatedUser.phone,

                dateOfBirth:
                    updatedUser.dateOfBirth,

                address:
                    updatedUser.address,

                occupation:
                    updatedUser.occupation,

                favorites:
                    updatedUser.favorites,

                createdAt:
                    updatedUser.createdAt,

                updatedAt:
                    updatedUser.updatedAt,

            },

        });


    } catch (error) {

        console.log(
            "Update profile error:",
            error
        );


        res.status(500).json({

            message: error.message,

        });

    }

};


/* =========================================================
   TOGGLE FAVORITE ROOM
========================================================= */

const toggleFavorite = async (req, res) => {

    try {

        const userId =
            req.user.id;


        const {
            roomId,
        } = req.params;


        const user =
            await User.findById(userId);


        if (!user) {

            return res.status(404).json({

                message: "User not found",

            });

        }


        const isFavorite =
            user.favorites.some(

                (favoriteId) =>

                    String(favoriteId) ===
                    String(roomId)

            );


        if (isFavorite) {

            user.favorites =
                user.favorites.filter(

                    (favoriteId) =>

                        String(favoriteId) !==
                        String(roomId)

                );

        } else {

            user.favorites.push(roomId);

        }


        await user.save();


        res.status(200).json({

            message: isFavorite

                ? "Room removed from favorites"

                : "Room added to favorites",

            favorites:
                user.favorites.map(
                    (favoriteId) =>
                        String(favoriteId)
                ),

        });


    } catch (error) {

        console.log(
            "Toggle favorite error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to update favorites",

        });

    }

};


/* =========================================================
   CLEAR ALL FAVORITES
========================================================= */

const clearFavorites = async (req, res) => {

    try {

        const user =
            await User.findById(
                req.user.id
            );


        if (!user) {

            return res.status(404).json({

                message: "User not found",

            });

        }


        user.favorites = [];


        await user.save();


        res.status(200).json({

            message:
                "All favorites cleared successfully",

            favorites: [],

        });


    } catch (error) {

        console.log(
            "Clear favorites error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to clear favorites",

        });

    }

};


module.exports = {

    registerUser,

    loginUser,

    getProfile,

    updateProfile,

    toggleFavorite,

    clearFavorites,

};