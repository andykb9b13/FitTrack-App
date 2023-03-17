const router = require("express").Router();

const graphRoutes = require("./graph-routes");
const userRoutes = require("./user-routes.js");
const uploadRoutes = require("./upload-routes");

router.use("/user", userRoutes);
router.use("/graph", graphRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
