const router = require("express").Router();
const User = require("../../Models/User");
const Activity = require("../../Models/Activitylog");
const Profile = require("../../Models/Profile");
const withAuth = require("../../utils/auth");
const Goals = require("../../Models/Goals");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// api/user route

// getting all users, mainly for viewing in Insomnia for now
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json("could not get users", err);
  }
});

router.delete("/id", withAuth, async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        user_id: req.session.userId,
      },
    });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// getting all activities, mainly for viewing in Insomnia for now
router.get("/activities", async (req, res) => {
  const allActivities = await Activity.findAll();
  res.status(200).json(allActivities);
});

// creating a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    console.log("This is newUser", newUser);

    req.session.save(() => {
      req.session.userId = newUser.user_id;
      req.session.email = newUser.email;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logging in a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.user_id;
      req.session.email = user.email;
      req.session.loggedIn = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

// ending a user session
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// ading a new activity
router.post("/activity", withAuth, async (req, res) => {
  try {
    await Activity.create({
      user_id: req.session.userId,
      entry_date: req.body.entry_date,
      duration: req.body.duration,
      distance: req.body.distance,
      activity_type: req.body.activity_type,
      weigh_in: req.body.weigh_in,
    });
    res.status(200).json("activity created");
  } catch (err) {
    res.status(500).json(err);
  }
});

// getting all profiles, mainly for viewing in Insomnia for now
router.get("/editprofile", async (req, res) => {
  try {
    const allProfiles = await Profile.findAll();
    const profileData = allProfiles.map((p) => p.get({ plain: true }));
    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new user profile
router.post("/editprofile", withAuth, async (req, res) => {
  try {
    const response = await Profile.create({
      user_id: req.session.userId,
      age: req.body.age,
      location: req.body.location,
      height: req.body.height,
      starting_weight: req.body.starting_weight,
      image_url: req.body.image_url,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit an existing user profile (still needs work)
router.put("/editprofile", withAuth, async (req, res) => {
  try {
    const response = await Profile.update(req.body, {
      where: {
        user_id: req.session.userId,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// deleting a profile
router.delete("/editprofile", withAuth, async (req, res) => {
  try {
    const response = await Profile.destroy({
      where: {
        user_id: req.session.userId,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// finding a profile by a specific user_id
router.get("/profile/id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: {
        user_id: req.session.userId,
      },
    });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get route for all goals to view in insomnia
router.get("/allgoals", async (req, res) => {
  try {
    const response = await Goals.findAll({
      where: {
        user_id: req.session.userId,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

//goals post
router.post("/goals", withAuth, async (req, res) => {
  try {
    const response = await Goals.create({
      user_id: req.session.userId,
      hours_of_exercise: req.body.hours_of_exercise,
      days_of_exercise: req.body.days_of_exercise,
      weightloss_goal: req.body.weightloss_goal,
      goal_start_date: req.body.goal_start_date,
      goal_end_date: req.body.goal_end_date,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// editing the user's goals
router.put("/goals", withAuth, async (req, res) => {
  try {
    const response = await Goals.update(req.body, {
      where: {
        user_id: req.session.userId,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// finding a set of goals for a particular user
router.get("/goals/id", async (req, res) => {
  try {
    const goals = await Goals.findOne({
      where: {
        user_id: req.session.userId,
      },
    });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
