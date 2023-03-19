let goalStart;
let goalEnd;
let weightLossGoal;
let hoursGoal;
let dayGoal;

document.addEventListener("DOMContentLoaded", function() {
  userGoalArr();
  userActivitiesArr();
});


// //get stored values to be used with functions
const userGoalArr = async () => {
  try {
    const response = await fetch("/api/user/allgoals", {
      method: "GET",
    });
    const data = await response.json();
    console.log("data fetch", data);

    // Check that the array has data
    if (data && data.length > 0) {
      const lastEntry = data[data.length - 1];
      weightLossGoal = lastEntry.weightloss_goal;
      dayGoal = lastEntry.days_of_exercise;
      hoursGoal = lastEntry.hours_of_exercise;
      goalStart = lastEntry.goal_start_date;
      goalEnd = lastEntry.goal_end_date;

      console.log("Last weightloss goal:", weightLossGoal);

      document.getElementById('goalEndsEl').textContent = "Your goal ends " +  goalEnd
      document.getElementById('hourGoalEl').textContent = "You set a goal of " + hoursGoal + " hours of exercise."
      document.getElementById('weightGoalEl').textContent = "You set a goal weight of " + weightLossGoal
      document.getElementById('goalDayEl').textContent = "You set a goal of " + dayGoal + " days of exercise."
      document.getElementById('hourGoalEl').textContent = "You set a goal of " + hoursGoal + " hours of exercise."

      // goalsDisplay(lastWeightLossGoal);


    } else {
      console.log("The data array is empty or undefined.");
    }
  } catch (err) {
    console.log(err);
  }
};


const userActivitiesArr = async () => {
    try {
      const response = await fetch("/api/graph/all", {
        method: "GET",
      });
      console.log("This is the response for goalchecker activities", response);
      const data = await response.json();
      console.log("goal checker activity data", data)
      const filteredData = data.filter((item) => {
        return item.entry_date >= goalStart && item.entry_date <= goalEnd;
      });

      if (filteredData.length === 0){
        document.getElementById('goalEndsEl').textContent = "Enter your first activity to track your progress."
        document.getElementById('hourGoalEl').textContent = ""
        document.getElementById('weightGoalEl').textContent = ""
        document.getElementById('goalDayEl').textContent = ""
        document.getElementById('hourGoalEl').textContent = ""
        document.getElementById('hourGoalProgEl').textContent = ""
        document.getElementById('weightProgEl').textContent = ""
        document.getElementById('dayGoalProgEl').textContent = ""
      } else {
        exerciseHoursGoal(filteredData);
        exerciseDaysGoal(filteredData);
        weightGoal(filteredData);
      
      }

      console.log("these are the filtered logs by date range", filteredData)

    } catch (err) {
      console.log(err);
    }
  };
//call on pageload


let exerciseHoursGoal = (filteredData) => {
    //filter exercise log array to only include log dates equal or greater than log entry dates and less than end date. 
    let activityLogs = filteredData;

      //add remaining array items and reduce to total duration. 
      const totalDuration = activityLogs.reduce((acc, log) => {
        return acc + log.duration;
      }, 0); 
      console.log("total hours exercise progress", totalDuration)
      
      let hoursExercised = Math.round(totalDuration / 60)
      let hoursRemaining = hoursGoal - hoursExercised
      if (hoursRemaining === null){
        document.getElementById('hourGoalProgEl').textContent = ""
        } else if (hoursRemaining === hoursGoal){
        goalStatus = "Get started on your hourly goal!"
        document.getElementById('hourGoalProgEl').textContent = goalStatus
      } else if (hoursRemaining >  0){
        goalStatus = "Not quite there. You have " + hoursRemaining + " hours to go! Keep working at it!"
        document.getElementById('hourGoalProgEl').textContent = goalStatus
      } else {
        goalStatus = "Awesome Job! You rocked your hourly goal!"
        document.getElementById('hourGoalProgEl').textContent = goalStatus
      }
      console.log("hours remaining", hoursRemaining)
};

// //TODO update element targets for text output
let exerciseDaysGoal = (filteredData) => {
 
    const goalEntriesCount = filteredData.length;

    let goalDaysRemaining = dayGoal - goalEntriesCount

    if (goalDaysRemaining === dayGoal){
      goalStatus = "Get started on your days exercised goal!"
      document.getElementById('dayGoalProgEl').textContent = goalStatus
    } else if (goalDaysRemaining >  0){
      goalStatus = "Not quite there. You have " + goalDaysRemaining + " days to go! Keep working at it!"
      document.getElementById('dayGoalProgEl').textContent = goalStatus
    } else {
      goalStatus = "Awesome Job! You rocked your days exercised goal!"
      document.getElementById('dayGoalProgEl').textContent = goalStatus
    }
};


let weightGoal = (filteredData) => {
  let lastItem = filteredData[filteredData.length - 1];
  let lastWeightIn = lastItem.weigh_in;
  
  console.log("recent weight: ", lastWeightIn);

    let weightRemaining = lastWeightIn - weightLossGoal

    if (weightRemaining > 0 ){
      goalStatus = "Not quite there but great progress! You have " + weightRemaining + " lbs to go. Keep up the hard work!"
      document.getElementById('weightProgEl').textContent = goalStatus
    } else {
      goalStatus = goalStatus = "Awesome Job! You rocked your weight loss goal!"
      document.getElementById('weightProgEl').textContent = goalStatus
    }
  };