
// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");


// class Goals extends Model {}


// Goals.init(
//   {
//     goalsLog_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "User",
//         key: "user_id",
//       },
//     },
//     week_of: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     activity_type: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     duration: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     distance: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     intensity: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "goals",
//   }
// );

// module.exports = Goals;

