const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Profile extends Model {}

Profile.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    starting_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // fitness_level: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "profile",
  }
);

module.exports = Profile;
