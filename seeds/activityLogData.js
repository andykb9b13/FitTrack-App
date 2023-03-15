const { Activity } = require("../models");

const activityData = [
  {
    activityLog_id: "1",
    user_id: "1",
    entry_date: "2023-03-6",
    // activity_type: "Biking",
    duration: "53",
    distance: "7",
    // intensity: "3",
  },
  {
    activityLog_id: "2",
    user_id: "1",
    entry_date: "2023-03-7",
    // activity_type: "Biking",
    duration: "54",
    distance: "8",
    // intensity: "3",
  },
  {
    activityLog_id: "3",
    user_id: "1",
    entry_date: "2023-03-8",
    // activity_type: "Biking",
    duration: "63",
    distance: "12",
    // intensity: "5",
  },
  {
    activityLog_id: "4",
    user_id: "1",
    entry_date: "2023-03-8",
    // activity_type: "Running",
    duration: "35",
    distance: "4",
    // intensity: "5",
  },
];

const seedActivity = () => Activity.bulkCreate(activityData);

module.exports = seedActivity;
