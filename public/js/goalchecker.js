const dayjs = require('dayjs')
let relativeTime = require('dayjs/plugin/relativeTime')

let goalDuration = userData.goal.duration_of_exercise
let goalDays = userData.goal.days_of_exercise
let goalWeight = userData.goal.weightloss_goal

let goalStart = userData.goal.goal_start_date
let goalEnd = userData.goal.goal_end_date


//relative time that will tell how many days until x date based on current session date. Can be used to display messages on how many days remaining to complete goal
// or set expire date on goal. 

dayjs.extend(relativeTime)
var a = dayjs('2000-01-01')
dayjs('1999-01-01').to(a)

//get stored values to be used with functions



const getActivities = async () => {
    try {
      const response = await fetch("/api/graph/all", {
        method: "GET",
      });
      console.log("This is the response for goalchecker", response);
      const data = response.json();
      console.log("activity data", data)
      exerciseHoursGoal(data);
      exerciseDaysGoal(data);
      weightLossGoal(data)
    } catch (err) {
      console.log(err);
    }
  };

//call on pageload
getActivities();

let exerciseHoursGoal = (data) => {
    //filter exercise log array to only include log dates equal or greater than log entry dates and less than end date. 
    let activityLogs = data;

    const filteredLogs = activityLogs.filter(log => {
        return log.entry_date >= goalStart && log.entry_date <= goalEnd;
      });
      
      //add remaining array items and reduce to total duration. 
      const totalDuration = filteredLogs.reduce((acc, log) => {
        return acc + log.duration;
      }, 0); 
      console.log("total hours exercise progress", totalDuration)
      hoursGoalsProgress(totalDuration);
};


//switch function to determine which text output depenidng on hours remaining
let hoursGoalsProgress = (totalDuration) => {
    let hoursExercised = totalDuration / 60
    let hoursRemaining = goalDuration - hoursExercised

   switch (hoursRemaining) {
    case hoursRemaining ===  goalDuration:
        goalStatus = "Get started on your hourly goal!"
        break;
    case hoursRemaining >  0:
        goalStatus = "Not quite there. You have" + hoursRemaining + " hours to go! Keep working at it!"
        break;
    case hoursRemaining < 0:
        goalStatus = "Awesome Job! You rocked your hourly goal!"
        break;
    }

};

//TODO update element targets for text output
let exerciseDaysGoal = (data) => {
    let activityLogs = data;

    const filteredLogs = activityLogs.filter(log => {
        return log.entry_date >= goalStart && log.entry_date <= goalEnd;
      });
      
      const goalEntriesCount = filteredLogs.length;

      let goalDaysRemaining = goalDays - goalEntriesCount

      switch (goalDaysRemaining) {
        case goalDaysRemaining ===  goalDays:
            goalStatus = "Get started on your days exercised goal!"
            document.getElementById('date').textContent = goalStatus
            break;
        case goalDaysRemaining >  0:
            goalStatus = "Not quite there. You have" + goalDaysRemaining + " days to go! Keep working at it!"
            break;
        case goalDaysRemaining < 0:
            goalStatus = "Awesome Job! You rocked your total days exercised goal!"
            break;
        }
};


let weightLossGoal = (data) => {
    let activityLogs = data;
    const lastWeighIn = activityLogs[activityLogs.length - 1].weigh_in;

    let weightRemaining = goalWeight - lastWeighIn

    switch (weightRemaining) {
        case weightRemaining ===  goalDays:
            goalStatus = "Get started on your days exercised goal!"
            document.getElementById('date').textContent = goalStatus
            break;
        case weightRemaining >  0:
            goalStatus = "Not quite there but great progress! You have " + weightRemaining + " lbs to go. Keep up the hard work!"
            break;
        case weightRemaining < 0:
            goalStatus = "Awesome Job! You rocked your weight loss goal!"
            break;
        }

};