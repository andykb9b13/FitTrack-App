
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
    weekly_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weekly_distance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight_loss_goal: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "goals",
  }
);

module.exports = Goals;

