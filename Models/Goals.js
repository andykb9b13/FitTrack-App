
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Goals extends Model {}


Goals.init(
  {
    goalsLog_id: {
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
    hours_of_exercise: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    days_of_exercise: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weightloss_goal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    goals_start_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goal_end_date: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "goals",
  }
);

module.exports = Goals;

