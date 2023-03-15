const router = require("express").Router();
const { Activity, Goals, Profile, User } = require("../../Models");

// api/graph route
router.get("/", (req, res) => {
  res.render("graph");
});

// getting array of activities to send to frontend
router.get("/all/activities", async (req, res) => {
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

// getting array of goals to send to frontend

// router.get("/goals", async (req, res) => {
//   try {
//     const goals = await Goals.findAll();
//     const goalsArr = goals.map((g) => g.get({ plain: true }));
//     console.log(goalsArr);
//     res.json(goalsArr);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
