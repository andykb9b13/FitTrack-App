const router = require("express").Router();
const User = require("../Models/User");
const Profile = require("../Models/Profile");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("landingpage");
  } catch (err) {
    res.status(500).json(err);
  }
});

// getting the profile page with user info
router.get("/profile", withAuth, async (req, res) => {
  try {
    console.log(req.session);
    const user = await User.findOne({
      where: {
        user_id: req.session.userId,
      },
      include: [Profile],
    });

    console.log("this is the user", user);
    const userData = user.get({ plain: true });
    console.log("This is USERDATA", userData);
    // We should get the activity data here maybe and send it to the frontend js?
    res.render("profilecard", { userData });
  } catch (err) {
    console.log("here is profile error", err);
    res.status(500).json(err);
  }
});

// hitting the activitylog page
router.get("/activity", withAuth, async (req, res) => {
  try {
    res.render("activitylog");
  } catch (err) {
    res.status(500).json(err);
  }
});

// hitting the signup page
router.get("/signup", async (req, res) => {
  try {
    res.status(200).render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

// hitting the login page
router.get("/login", async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit", withAuth, async (req, res) => {
  try {
    res.status(200).render("editprofile");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
