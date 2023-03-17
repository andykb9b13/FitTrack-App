const router = require("express").Router();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const path = require("path");
// const { multerUploads, dataUri } = require("../../middleware/upload");

cloudinary.config({
  cloud_name: "dezrrgciy",
  api_key: "835467973965936",
  api_secret: "ylZdoMPkYlRWtjvHOU-oJxkjkHk",
});

// /api/upload route

//image upload get
router.post("/", async (req, res) => {
  try {
    const response = await cloudinary.uploader.upload(
      "/Users/andrewkleindienst/Bootcamp/group4-project/public/assets/images/branding/FIT_TRACK_BRAND_GUIDE.jpg",
      { folder: "fittrack/branding", public_id: "branding" }
    );
    console.log("This is the response", response);
    console.log("This is the secure url", response.secure_url);

    // Generate
    // const url = cloudinary.url("olympic_flag", {
    //   width: 100,
    //   height: 150,
    //   Crop: "fill",
    // });

    // res.json(url);
    // The output url
    // console.log(url);
    // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const image = cloudinary.image("fittrack/branding/branding");
    const url = cloudinary.url("fittrack/branding/branding");
    res.json(url, image);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
