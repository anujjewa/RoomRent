const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,

    },

    role: {
        type: String,
        enum: ["owner", "renter"],
        default: "renter",
    },

    phone: {
    type: String,
    default: "",
},

dateOfBirth: {
    type: Date,
    default: null,
},

address: {
    type: String,
    default: "",
},

occupation: {
    type: String,
    default: "",
},

   favorites: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },
],

}, {
    timestamps: true,
});

const user = mongoose.model("User", userSchema);

module.exports= user;