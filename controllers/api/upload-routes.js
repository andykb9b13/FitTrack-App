const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//image upload get
router.get("/", async (req, res) => {
  try {
    const response = await cloudinary.uploader.upload(
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
      { public_id: "olympic_flag" }
    );
    console.log(response.json);
    console.log(response.secure_url.json);

    // Generate
    const url = cloudinary.url("olympic_flag", {
      width: 100,
      height: 150,
      Crop: "fill",
    });

    // The output url
    console.log(url);
    // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
module.exports = multerUploads;
