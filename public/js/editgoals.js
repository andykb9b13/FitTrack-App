const dayjs = require('dayjs')

var now = dayjs().format('YYYY/MM/DD')

console.log("this is now: ", now)

const saveGoalsForm = async function (event) {
    event.preventDefault();
  
    const totalHoursEl = document.querySelector("#total-hours");
    const daysOfExerciseEl = document.querySelector("#days-of-exercise");
    const targetweightEl = document.querySelector("#target-weight");
    const goalEndDateEl = document.querySelector("#goal-end-date")
    
    try {
    const response = await fetch("/api/user/goals", {
      method: "POST",
      body: JSON.stringify({
        hours_of_exercise: totalHoursEl.value,
        days_of_exercise: daysOfExerciseEl.value,
        weightloss_goal: targetweightEl.value,
        goal_start_date: now,
        goal_end_date: goalEndDateEl.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("goals response", response);
  
    if (response.ok) {
      document.location.replace("/goals");
      alert("Goals updated!");
    } else {
      alert("Failed to update profile.");
    }
  } catch (err) {
    console.log("error in goals", err)
  }
  };
  
  const profileRedirect = async (event) => {
    event.preventDefault();
    document.location.replace("/profile");
  };
  
  document
    .querySelector("#savegoals")
    .addEventListener("click", saveGoalsForm);
  
  document
     .querySelector("#cancelBtn")
   .addEventListener("click", profileRedirect);
  