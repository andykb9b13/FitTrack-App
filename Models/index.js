const User = require("./User");
const Profile = require("./Profile");
const Goals = require("./Goals");
const Activity = require("./Activitylog");

User.hasOne(Profile, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Profile.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Activity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Activity.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasOne(Goals, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Goals.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Profile, Activity };
