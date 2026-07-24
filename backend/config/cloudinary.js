const cloudinary = require("cloudinary").v2;


/* =========================================================
   CLOUDINARY ENVIRONMENT VALIDATION
========================================================= */

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME?.trim();

const apiKey =
  process.env.CLOUDINARY_API_KEY?.trim();

const apiSecret =
  process.env.CLOUDINARY_API_SECRET?.trim();


if (!cloudName) {

  throw new Error(
    "CLOUDINARY_CLOUD_NAME is missing"
  );

}


if (!apiKey) {

  throw new Error(
    "CLOUDINARY_API_KEY is missing"
  );

}


if (!apiSecret) {

  throw new Error(
    "CLOUDINARY_API_SECRET is missing"
  );

}


/* =========================================================
   CLOUDINARY CONFIGURATION
========================================================= */

cloudinary.config({

  cloud_name: cloudName,

  api_key: apiKey,

  api_secret: apiSecret,

  secure: true,

});


/* =========================================================
   SAFE CONFIG DEBUG
========================================================= */

console.log(
  "Cloudinary configured:",
  {
    cloudName,
    apiKey,
    apiSecretLoaded: Boolean(apiSecret),
    apiSecretLength: apiSecret.length,
  }
);


module.exports = cloudinary;