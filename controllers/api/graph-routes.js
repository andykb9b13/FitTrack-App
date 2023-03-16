const router = require("express").Router();
const { Activity, Goals, Profile, User } = require("../../Models");

// getting array of activities to send to frontend
router.get("/all", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: {
        user_id: req.session.userId,
      },
    });
    const activityArr = activities.map((a) => a.get({ plain: true }));
    console.log("This is activityArr in api/graph route", activityArr);
    res.json(activityArr);
  } catch (err) {
    res.status(500).json("error getting activities", err);
  }
});

// TODO can I turn these three routes into one "/:activity" route?
// getting array of running activities ONLY
router.get("/running", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: {
        user_id: req.session.userId,
        activity_type: "running",
      },
    });
    const runningArr = activities.map((a) => a.get({ plain: true }));
    console.log("This is runningArr in api/graph route", runningArr);
    res.json(runningArr);
  } catch (err) {
    res.status(500).json("error getting activities", err);
  }
});

// getting array of running activities ONLY
router.get("/swimming", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: {
        user_id: req.session.userId,
        activity_type: "swimming",
      },
    });
    const swimmingArr = activities.map((a) => a.get({ plain: true }));
    console.log("This is swimmingArr in api/graph route", swimmingArr);
    res.json(swimmingArr);
  } catch (err) {
    res.status(500).json("error getting activities", err);
  }
});

// getting array of running activities ONLY
router.get("/biking", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: {
        user_id: req.session.userId,
        activity_type: "biking",
      },
    });
    const bikingArr = activities.map((a) => a.get({ plain: true }));
    console.log("This is swimmingArr in api/graph route", bikingArr);
    res.json(bikingArr);
  } catch (err) {
    res.status(500).json("error getting activities", err);
  }
});

module.exports = router;
