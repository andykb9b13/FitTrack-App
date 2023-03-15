const { User } = require("../models");

const userdata = [
  {
    name: "Jane Doe",
    email: "jane@thedoe.com",
    password: "d0th3d03",
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
