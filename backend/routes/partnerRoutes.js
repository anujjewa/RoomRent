console.log("PARTNER ROUTES LOADED");

const express = require("express");

const upload = require("../middleware/upload");

const validateRequest = require("../middleware/validation/validateRequest");

const {
    partnerValidation,
} = require("../middleware/validation/partnerValidation");

const {
  createPartner,
  getPartners,
  getMyListing,
  updatePartner,
  deletePartner,
  incrementPartnerViews,
  getPartnerById,
} = require("../controllers/partnerController");

const protect = require("../middleware/authMiddleware");

const authorizeRole = require(
  "../middleware/roleMiddleware"
);

const router = express.Router();


/* =========================================================
   TEST ROUTE
========================================================= */

router.get("/test", (req, res) => {

  res.send("Partner Route Working");

});


/* =========================================================
   GET ALL PARTNERS
========================================================= */

router.get("/", getPartners);


/* =========================================================
   GET MY LISTING
========================================================= */

router.get(
  "/my-listing",
  protect,
  authorizeRole("renter"),
  getMyListing
);


/* =========================================================
   GET PARTNER BY ID
========================================================= */

router.get(
  "/:id",
  getPartnerById
);


/* =========================================================
   INCREMENT PARTNER PROFILE VIEWS
========================================================= */

router.patch(
  "/:id/view",
  protect,
  incrementPartnerViews
);


/* =========================================================
   CREATE PARTNER PROFILE
========================================================= */

router.post(
  "/",
  protect,
  authorizeRole("renter"),
  upload.single("image"),
  partnerValidation,
  validateRequest,
  createPartner
);
/* =========================================================
   UPDATE MY PARTNER PROFILE
========================================================= */

router.put(
  "/my-listing",
  protect,
  authorizeRole("renter"),
  upload.single("image"),
  updatePartner
);


/* =========================================================
   DELETE MY PARTNER PROFILE
========================================================= */

router.delete(
  "/my-listing",
  protect,
  authorizeRole("renter"),
  deletePartner
);


module.exports = router;