const dayjs = require('dayjs')
let relativeTime = require('dayjs/plugin/relativeTime')

let goalDuration = userData.goal.duration_of_exercise
let goalDays = userData.goal.days_of_exercise
let goalWeight = userData.goal.weightloss_goal

let goalStart = userData.goal.goal_start_date
let goalEnd = userData.goal.goal_end_date


//relative time that will tell how many days until x date based on current session date. Can be used to display messages on how many days remaining to complete goal
// or set expire date on goal. 

// dayjs.extend(relativeTime)
// var a = dayjs('2000-01-01')
// dayjs('1999-01-01').to(a)

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
    } catch (err) {
      console.log(err);
    }
  };

  getActivities();


// let goalDate = //get goal from goal_end_date: goalEndDateEl.value,
// let goalEnteredDate = //get timestamp of goal entered

// let totalHours = //hours totaled from 'duration: durationEl.value,' ranging from from goal date to now date.  
// let totalDays = //entries totaled from 'entry_date: entryDateEl.value,'ranging from from goal entered date to now date.



let exerciseHoursGoal = (data) => {
    //filter exercise log array to only include log dates equal or greater than log entry dates and less than end date. 
    const filteredLogs = activityLogs.filter(log => {
        return log.entry_date >= startDate && log.entry_date <= endDate;
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


let exerciseDaysGoal = (data) => {
    const filteredLogs = activityLogs.filter(log => {
        return log.entry_date >= startDate && log.entry_date <= endDate;
      });
      
      const goalEntriesCount = filteredLogs.length;

      let goalDaysRemaining = goalDays - goalEntriesCount

      switch (goalDaysRemaining) {
        case goalDaysRemaining ===  goalDays:
            goalStatus = "Get started on your days exercised goal!"
            break;
        case goalDaysRemaining >  0:
            goalStatus = "Not quite there. You have" + goalDaysRemaining + " days to go! Keep working at it!"
            break;
        case goalDaysRemaining < 0:
            goalStatus = "Awesome Job! You rocked your total days exercised goal!"
            break;
        }
};


let weightLossGoal = () => {




};



exerciseHoursGoal(); 
exerciseDaysGoal();
weightLossGoal();