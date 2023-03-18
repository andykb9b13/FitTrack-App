const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../public/assets/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, path.extname(file.originalname));
  },
});
const uploads = multer({ storage, limits: { fieldSize: 10 * 1024 * 1024 } });
const multerUploads = uploads.single("image");

module.exports = multerUploads;
