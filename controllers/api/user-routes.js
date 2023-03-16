const router = require("express").Router();
// changed { User } to User and changed /models to /Models/User

const User = require("../../Models/User");
const Activity = require("../../Models/Activitylog");
const Profile = require("../../Models/Profile");

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
    // res.status(200).json(newUser);
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
router.post("/add/newActivity", async (req, res) => {
  try {
    await Activity.create({
      user_id: req.session.userId,
      entry_date: req.body.entry_date,
      duration: req.body.duration,
      distance: req.body.distance,
      activity_type: req.body.activity_type,
    });
    res.status(200).json("activity created");
  } catch (err) {
    res.status(500).json(err);
  }
});

// getting all profiles, mainly for viewing in Insomnia for now
router.get("/edit/profile", async (req, res) => {
  try {
    const allProfiles = await Profile.findAll();
    const profileData = allProfiles.map((p) => p.get({ plain: true }));
    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new user profile
router.post("/edit/profile", async (req, res) => {
  try {
    const response = await Profile.create({
      user_id: req.session.userId,
      age: req.body.age,
      location: req.body.location,
      height: req.body.height,
      starting_weight: req.body.starting_weight,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit an existing user profile (still needs work)
router.put("/edit", async (req, res) => {
  try {
    const [affectedRows] = await Profile.update(req.body, {
      where: {
        user_id: req.session.userId,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/id/:id", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         user_id: req.params.id,
//       },
//     });
//     // const userData = user.map((u) => u.get({ plain: true }));
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
