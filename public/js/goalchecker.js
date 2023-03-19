// // let goalDuration = userData.goal.duration_of_exercise
// // let goalDays = userData.goal.days_of_exercise
// // let goalWeight = userData.goal.weightloss_goal

// // let goalStart = userData.goal.goal_start_date
// // let goalEnd = userData.goal.goal_end_date

let goalStart = '2023-03-12'
let goalEnd = '2023-03-15'

let hoursGoal;
let dayGoal;

// //relative time that will tell how many days until x date based on current session date. Can be used to display messages on how many days remaining to complete goal
// // or set expire date on goal. 

// dayjs.extend(relativeTime)
// var a = dayjs('2000-01-01')
// dayjs('1999-01-01').to(a)



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
      lastWeightLossGoal = lastEntry.weightloss_goal;
      dayGoal = lastEntry.days_of_exercise;
      hoursGoal = lastEntry.hours_of_exercise;

      console.log("Last weightloss goal:", lastWeightLossGoal);

      document.getElementById('weightGoalEl').textContent = "You set a goal weight of " + lastWeightLossGoal
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
userGoalArr();

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
      exerciseHoursGoal(filteredData);
      exerciseDaysGoal(filteredData);
      console.log("these are the filtered logs by date range", filteredData)

    } catch (err) {
      console.log(err);
    }
  };
//call on pageload
userActivitiesArr();


let exerciseHoursGoal = async (filteredData) => {
    //filter exercise log array to only include log dates equal or greater than log entry dates and less than end date. 
    let activityLogs = filteredData;

      //add remaining array items and reduce to total duration. 
      const totalDuration = activityLogs.reduce((acc, log) => {
        return acc + log.duration;
      }, 0); 
      console.log("total hours exercise progress", totalDuration)
      
      let hoursExercised = Math.round(totalDuration / 60)
      let hoursRemaining = hoursGoal - hoursExercised
      
      if (hoursRemaining === hoursGoal){
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


// };

// //TODO update element targets for text output
let exerciseDaysGoal = async (filteredData) => {
 
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
    console.log("hours remaining", hoursRemaining)
};


// let weightLossGoal = (lastWeightLossGoal, lastWeighIn) => {
//     let weightLossGoal = lastWeightLossGoal;
//     let weighIn = lastWeighIn

//     let weightRemaining = weightLossGoal - weighIn

//     switch (weightRemaining) {
//         case weightRemaining >  0:
//             goalStatus = "Not quite there but great progress! You have " + weightRemaining + " lbs to go. Keep up the hard work!"
//             document.getElementById('weightProgEl').textContent = goalStatus
//             break;
//         case weightRemaining <= 0:
//             goalStatus = "Awesome Job! You rocked your weight loss goal!"
//             break;
//         }
//       };