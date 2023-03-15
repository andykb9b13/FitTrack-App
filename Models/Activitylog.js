const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Activity extends Model {}

Activity.init(
  {
    activityLog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    entry_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // activity_type: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // intensity: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "activity",
  }
);

module.exports = Activity;
