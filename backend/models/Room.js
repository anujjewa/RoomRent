const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    views: {
  type: Number,
  default: 0,
},

    location: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

  

    roomType: {
      type: String,
      enum: [
        "single",
        "shared",
        "1bhk",
        "2bhk",
        "3bhk",
        "pg",
      ],
    },

    bedrooms: {
      type: Number,
      default: 1,
      min: 0,
    },

    bathrooms: {
      type: Number,
      default: 1,
      min: 0,
    },

    furnishing: {
      type: String,
      enum: [
        "furnished",
        "semi-furnished",
        "unfurnished",
      ],
      default: "unfurnished",
    },

    area: {
      type: Number,
      min: 0,
    },

    floor: {
      type: Number,
      min: 0,
    },

  

    amenities: [
      {
        type: String,
      },
    ],

   

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);