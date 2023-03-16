const router = require("express").Router();

const graphRoutes = require("./graph-routes");
const userRoutes = require("./user-routes.js");


router.use("/user", userRoutes);
router.use("/graph", graphRoutes);

module.exports = router;
