const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const Partner = require("../models/Partner");


/* =========================================================
   CLOUDINARY IMAGE UPLOAD
========================================================= */

const uploadPartnerImage = async (fileBuffer) => {

  const result = await new Promise(
    (resolve, reject) => {

      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: "roomrent/partners",
          },
          (error, uploadResult) => {

            if (error) {

              reject(error);

              return;

            }

            resolve(uploadResult);

          }
        );

      streamifier
        .createReadStream(fileBuffer)
        .pipe(stream);

    }
  );

  return result.secure_url;

};


/* =========================================================
   CREATE PARTNER
========================================================= */

const createPartner = async (req, res) => {

  try {

    const existingPartner = await Partner.findOne({
      owner: req.user.id,
    });

    if (existingPartner) {

      return res.status(400).json({
        message:
          "You already have a partner listing",
      });

    }

    if (!req.file) {

      return res.status(400).json({
        message: "Profile photo is required",
      });

    }

    const imageUrl = await uploadPartnerImage(
      req.file.buffer
    );

    const partner = await Partner.create({

      name: req.body.name,

      age: req.body.age,

      location: req.body.location,

      occupation: req.body.occupation,

      genderPreference:
        req.body.genderPreference,

      contact: req.body.contact,

      description: req.body.description,

      image: imageUrl,

      owner: req.user.id,

    });

    res.status(201).json(partner);

  } catch (error) {

    console.log(
      "Create partner error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }

};


/* =========================================================
   GET ALL PARTNERS
========================================================= */

const getPartners = async (req, res) => {

  try {

    const partners = await Partner.find();

    res.status(200).json(partners);

  } catch (error) {

    console.log(
      "Get partners error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }

};


/* =========================================================
   GET MY LISTING
========================================================= */

const getMyListing = async (req, res) => {

  try {

    const partner = await Partner.findOne({
      owner: req.user.id,
    });

    if (!partner) {

      return res.status(404).json({
        message: "No Listing Found",
      });

    }

    res.status(200).json(partner);

  } catch (error) {

    console.log(
      "Get my listing error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }

};


/* =========================================================
   UPDATE PARTNER
========================================================= */

const updatePartner = async (req, res) => {

  try {

    const partner = await Partner.findOne({
      owner: req.user.id,
    });

    if (!partner) {

      return res.status(404).json({
        message: "No Listing Found",
      });

    }

    partner.name =
      req.body.name ?? partner.name;

    partner.age =
      req.body.age ?? partner.age;

    partner.location =
      req.body.location ?? partner.location;

    partner.occupation =
      req.body.occupation ??
      partner.occupation;

    partner.genderPreference =
      req.body.genderPreference ??
      partner.genderPreference;

    partner.contact =
      req.body.contact ?? partner.contact;

    partner.description =
      req.body.description ??
      partner.description;


    /* =====================================================
       UPDATE IMAGE ONLY WHEN NEW IMAGE IS UPLOADED
    ===================================================== */

    if (req.file) {

      const imageUrl =
        await uploadPartnerImage(
          req.file.buffer
        );

      partner.image = imageUrl;

    }


    const updatedPartner =
      await partner.save();

    res.status(200).json(updatedPartner);

  } catch (error) {

    console.log(
      "Update partner error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }

};


/* =========================================================
   DELETE PARTNER
========================================================= */

const deletePartner = async (req, res) => {

  try {

    const partner = await Partner.findOne({
      owner: req.user.id,
    });

    if (!partner) {

      return res.status(404).json({
        message: "No Listing Found",
      });

    }

    await Partner.findByIdAndDelete(
      partner._id
    );

    res.status(200).json({
      message:
        "Listing Deleted Successfully",
    });

  } catch (error) {

    console.log(
      "Delete partner error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }

};


/* =========================================================
   INCREMENT PARTNER VIEWS
========================================================= */

const incrementPartnerViews = async (
  req,
  res
) => {

  try {

    const partner = await Partner.findById(
      req.params.id
    );

    if (!partner) {

      return res.status(404).json({
        message:
          "Partner listing not found",
      });

    }


    /* =====================================================
       OWN PROFILE VIEW WILL NOT BE COUNTED
    ===================================================== */

    if (
      String(partner.owner) ===
      String(req.user.id)
    ) {

      return res.status(200).json(
        partner
      );

    }


    partner.views =
      (partner.views || 0) + 1;

    await partner.save();

    res.status(200).json(partner);

  } catch (error) {

    console.log(
      "Increment partner views error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update partner views",
    });

  }

};


/* =========================================================
   GET PARTNER BY ID
========================================================= */

const getPartnerById = async (
  req,
  res
) => {

  try {

    const partner = await Partner.findById(
      req.params.id
    );

    if (!partner) {

      return res.status(404).json({
        message: "Partner not found",
      });

    }

    res.status(200).json(partner);

  } catch (error) {

    console.log(
      "Get partner by ID error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {

  createPartner,

  getPartners,

  getMyListing,

  updatePartner,

  deletePartner,

  incrementPartnerViews,

  getPartnerById,

};