const router = require("express").Router();
const Activity = require("../../Models/Activitylog");
const withAuth = require("../../utils/auth");

router.post("/newActivity", withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newActivity = await Activity.create({
      user_id: req.session.userId,
      entry_date: req.body.entry_date,
      duration: req.body.duration,
      distance: req.body.distance,
    });
    res.status(200).json(newActivity);
    alert("New Activity Created!");
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
