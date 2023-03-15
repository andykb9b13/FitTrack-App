const sequelize = require("../config/connection");

const userSeedData = require("./userAccountData");
const profileSeedData = require("./profileData");
const activitySeedData = require("./activityLogData");
// const goalSeedData = require("./goalData");


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userSeedData();

  await profileSeedData();

  await activitySeedData();

  // await goalSeedData();

  //   const users = await User.bulkCreate(userSeedData,{
  //     individualHooks: true,
  //     returning: true,

  //   for (const { user_id } of users) {
  //     const newProfile = await Profile.create({
  //       user_id: user_id,
  //     });
  //     const newGoal = await Goals.create({
  //         user_id: user_id,
  //     });
  //       const newActivity = await Activity.create({
  //         user_id: user_id,
  //     });
  //   }

  process.exit(0);
};

seedDatabase();
