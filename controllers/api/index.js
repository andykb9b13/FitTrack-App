const router = require("express").Router();

const graphRoutes = require("./graph-routes");
const userRoutes = require("./user-routes.js");
const postRoutes = require("./post-routes");


router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/graph", graphRoutes);

module.exports = router;
